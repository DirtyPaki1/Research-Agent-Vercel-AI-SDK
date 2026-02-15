import { NextRequest, NextResponse } from 'next/server'
import { addDocument, getDocuments, StoredDocument } from '@/lib/store'

export async function POST(request: NextRequest) {
  console.log('📤 Upload endpoint called')
  
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    console.log(`📄 Processing: ${file.name} (${file.size} bytes)`)
    
    // Read file content
    const buffer = await file.arrayBuffer()
    const text = new TextDecoder().decode(buffer)
    
    // Create document object
    const document: StoredDocument = {
      id: Date.now().toString(),
      filename: file.name,
      content: text,
      preview: text.substring(0, 200) + (text.length > 200 ? '...' : ''),
      size: file.size,
      type: file.type,
      uploadedAt: new Date().toISOString()
    }
    
    // Store in shared memory
    addDocument(document)
    
    return NextResponse.json({
      success: true,
      filename: file.name,
      message: 'Document stored in memory',
      preview: document.preview,
      documentId: document.id,
      stored: true
    })
    
  } catch (error: any) {
    console.error('❌ Upload error:', error)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}

export async function GET() {
  console.log('📚 GET /api/upload called')
  
  const documents = getDocuments()
  console.log(`📚 Returning ${documents.length} documents`)
  
  return NextResponse.json({
    documents: documents.map(doc => ({
      filename: doc.filename,
      preview: doc.preview,
      uploadTime: new Date(doc.uploadedAt).toLocaleString()
    }))
  })
}