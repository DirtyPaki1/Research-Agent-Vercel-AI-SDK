import { runAgent } from '@/lib/agent-engine';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();
    
    if (!message) {
      return new Response('Message is required', { status: 400 });
    }
    
    const result = await runAgent(message);
    
    return result.toDataStreamResponse();
    
  } catch (error) {
    console.error('Chat error:', error);
    return new Response('Internal server error', { status: 500 });
  }
}