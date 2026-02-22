// Option A: Pinecone
import { Pinecone } from '@pinecone-database/pinecone';
import { embed } from 'ai';
import { openai } from '@ai-sdk/openai';

const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });
const index = pinecone.index('research-docs');

export async function storeDocument(chunks: { text: string; metadata: any }[]) {
  const vectors = await Promise.all(
    chunks.map(async (chunk) => {
      const { embedding } = await embed({
        model: openai.embedding('text-embedding-3-small'),
        value: chunk.text,
      });
      return {
        id: `doc_${Date.now()}_${Math.random()}`,
        values: embedding,
        metadata: chunk.metadata,
      };
    })
  );
  
  await index.upsert(vectors);
  return vectors.length;
}

export async function queryVectorDB(query: string, topK = 5) {
  const { embedding } = await embed({
    model: openai.embedding('text-embedding-3-small'),
    value: query,
  });
  
  const results = await index.query({
    vector: embedding,
    topK,
    includeMetadata: true,
  });
  
  return results.matches.map(match => ({
    text: match.metadata?.text || '',
    score: match.score,
    source: match.metadata?.source || 'Unknown',
  }));
}