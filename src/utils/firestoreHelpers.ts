import { doc, getDoc } from 'firebase/firestore';
import type { DocumentData } from 'firebase/firestore';
import { db } from './firebase';

/**
 * Fetches a document from Firestore based on environment and document name.
 * @param docName The document name (e.g., 'bio', 'skill', 'experience', 'project')
 * @returns The data from the Firestore document, or null if not found.
 */
export async function fetchSectionDoc(docName: string): Promise<DocumentData | null> {
  const isProd = process.env.NODE_ENV === 'production';
  const collectionName = isProd ? 'production' : 'testing';
  const docRef = doc(db, collectionName, docName);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : null;
}
