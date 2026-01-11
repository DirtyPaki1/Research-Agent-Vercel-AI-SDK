import { streamText, tool } from 'ai';
import { openai } from '@ai-sdk/openai';
import { queryVectorDB } from './vector-db';

// Define the agent's tools
const knowledgeBaseTool = tool({
  description: "Search the uploaded documents and knowledge base for relevant information",
  parameters: {
    query: {
      type: "string",
      description: "The search query to find relevant documents"
    }
  },
  execute: async ({ query }) => {
    console.log(`🔍 Searching knowledge base for: ${query}`);
    const results = await queryVectorDB(query, 5);
    
    if (results.length === 0) {
      return "No relevant information found in the knowledge base.";
    }
    
    const context = results
      .map((result, i) => `[Source: ${result.source}, Relevance: ${result.score.toFixed(2)}]\n${result.text}`)
      .join('\n\n---\n\n');
    
    return `Found ${results.length} relevant document chunks:\n\n${context}`;
  }
});

const webSearchTool = tool({
  description: "Search the web for current, up-to-date information",
  parameters: {
    query: {
      type: "string",
      description: "The search query for web search"
    }
  },
  execute: async ({ query }) => {
    console.log(`🌐 Searching web for: ${query}`);
    
    // Using SerpAPI (Google Search)
    const response = await fetch('https://serpapi.com/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        q: query,
        api_key: process.env.SERPAPI_API_KEY,
        engine: 'google',
        num: 5
      })
    });
    
    const data = await response.json();
    
    if (data.organic_results) {
      const results = data.organic_results.slice(0, 3).map((result: any) => ({
        title: result.title,
        link: result.link,
        snippet: result.snippet
      }));
      
      return `Web search results:\n${results.map((r: any) => `• ${r.title}: ${r.snippet}\n  Source: ${r.link}`).join('\n')}`;
    }
    
    return "No web results found.";
  }
});

// Main agent function
export async function runAgent(userMessage: string) {
  const systemPrompt = `You are a Research Assistant Agent. Your job is to help users by:
1. FIRST checking if their question can be answered from the uploaded documents/knowledge base
2. If not enough info exists, search the web for current information
3. If both sources have info, combine them intelligently
4. Always cite your sources clearly

Guidelines:
- Use knowledgeBaseTool for questions about specific documents, manuals, or known information
- Use webSearchTool for current events, recent developments, or general knowledge not in documents
- For complex questions, you may use BOTH tools
- Always explain which source you're using

Current user question: ${userMessage}`;

  return streamText({
    model: openai('gpt-4-turbo-preview'),
    system: systemPrompt,
    messages: [
      { role: 'user', content: userMessage }
    ],
    tools: {
      knowledgeBaseTool,
      webSearchTool
    },
    maxSteps: 5, // Allow multiple tool calls if needed
    onStepFinish: (step) => {
      console.log(`Step completed: ${step.stepType}`);
    }
  });
}