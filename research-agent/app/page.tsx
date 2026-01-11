import ChatInterface from './components/ChatInterface';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <ChatInterface />
      
      <footer className="text-center text-gray-500 text-sm p-4 mt-8">
        <p>
          Built with Next.js, Vercel AI SDK, and {process.env.VECTOR_DB === 'pinecone' ? 'Pinecone' : 'Supabase'} Vector DB
        </p>
        <p className="mt-1">
          Demonstrates RAG, AI tool-calling, and agentic workflows for intelligent question answering
        </p>
      </footer>
    </main>
  );
}