import { NextRequest, NextResponse } from 'next/server'
import { getDocuments } from '@/lib/store'
import { OpenAI } from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  console.log('💬 Chat endpoint called')
  
  try {
    const { message } = await request.json()
    
    if (!message) {
      return NextResponse.json(
        { error: 'No message provided' },
        { status: 400 }
      )
    }

    console.log('Question:', message.substring(0, 50))
    
    // Get documents from shared store
    const documents = getDocuments()
    console.log(`📚 Found ${documents.length} documents in store`)
    
    // Log document details for debugging
    documents.forEach((doc, i) => {
      console.log(`📄 Document ${i+1}: ${doc.filename} (${doc.content.length} chars)`)
    })
    
    // If no documents, return early
    if (documents.length === 0) {
      return NextResponse.json({
        response: "I don't see any documents in your knowledge base yet. Try uploading a file first using the 'Upload Docs' button!",
        contextFound: false,
        documentCount: 0
      })
    }
    
    // Check if the question is about documents in general
    const isAskingAboutDocuments = message.toLowerCase().includes('document') || 
                                   message.toLowerCase().includes('file') ||
                                   message.toLowerCase().includes('upload') ||
                                   message.toLowerCase().includes('what do i have')
    
    if (isAskingAboutDocuments) {
      const docList = documents.map((doc, i) => 
        `${i+1}. **${doc.filename}** (${Math.round(doc.size/1024)} KB)`
      ).join('\n')
      
      return NextResponse.json({
        response: `You have ${documents.length} document(s) in your knowledge base:\n\n${docList}\n\nWhat would you like to know about them?`,
        contextFound: true,
        documentCount: documents.length
      })
    }
    
    // For content questions, we need to use OpenAI
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({
        response: `I found ${documents.length} document(s), but OpenAI is not configured. Here are the filenames:\n\n${
          documents.map(d => `• ${d.filename}`).join('\n')
        }\n\nTo analyze content, add your OpenAI API key to .env.local`,
        contextFound: true,
        documentCount: documents.length
      })
    }
    
    // Build comprehensive context from documents
    let context = ''
    if (documents.length > 0) {
      context = documents
        .map((doc, index) => {
          // For PDFs, note that they're binary
          const isPDF = doc.filename.toLowerCase().endsWith('.pdf')
          const contentPreview = isPDF 
            ? "[PDF Document - Binary content not fully extracted]"
            : doc.content.substring(0, 2000)
          
          return `[Document ${index + 1}: ${doc.filename}]\n${contentPreview}`
        })
        .join('\n\n---\n\n')
    }
    
    console.log('Sending to OpenAI with context length:', context.length)
    
    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `You are a research assistant analyzing uploaded documents. Here are the documents:\n\n${context}\n\nAnswer questions based on these documents. If the answer isn't in any document, say "I don't see that information in your uploaded documents." Always reference which document you're using.`
          },
          { role: 'user', content: message }
        ],
        temperature: 0.7,
        max_tokens: 1000,
      })
      
      const response = completion.choices[0].message.content || ''
      
      // Add source note
      const finalResponse = response + `\n\n📚 *Based on ${documents.length} document${documents.length > 1 ? 's' : ''} in your knowledge base*`
      
      return NextResponse.json({
        response: finalResponse,
        contextFound: true,
        documentCount: documents.length
      })
      
    } catch (openaiError: any) {
      console.error('OpenAI error:', openaiError)
      
      // Fallback response with document info
      return NextResponse.json({
        response: `I have ${documents.length} document(s) but couldn't analyze them with AI. Here's what I know:\n\n${
          documents.map(d => `• ${d.filename}`).join('\n')
        }\n\nTechnical error: ${openaiError.message}`,
        contextFound: true,
        documentCount: documents.length
      })
    }
    
  } catch (error: any) {
    console.error('❌ Chat error:', error)
    return NextResponse.json({
      response: 'Sorry, I encountered an error. Please try again.'
    })
  }
}