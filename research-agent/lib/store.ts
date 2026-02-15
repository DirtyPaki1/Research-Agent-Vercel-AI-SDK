// lib/store.ts
// Shared memory store for all API routes

export interface StoredDocument {
    id: string;
    filename: string;
    content: string;
    preview: string;
    size: number;
    type: string;
    uploadedAt: string;
  }
  
  // Global store that persists across API routes
  declare global {
    var documentStore: StoredDocument[];
  }
  
  // Initialize if not exists
  global.documentStore = global.documentStore || [];
  
  export const documentStore = global.documentStore;
  
  // Helper functions
  export function addDocument(doc: StoredDocument) {
    documentStore.push(doc);
    console.log(`📚 Store now has ${documentStore.length} documents`);
    return doc;
  }
  
  export function getDocuments() {
    return documentStore;
  }
  
  export function clearDocuments() {
    documentStore.length = 0;
  }