// Firestore content storage for inline editing
// Each editable text block has a unique contentId

import {
    doc,
    getDoc,
    setDoc,
    getDocs,
    collection,
    Timestamp,
    writeBatch,
} from 'firebase/firestore';
import { db } from './firebase';

const COLLECTION = 'content';

export interface ContentItem {
    id: string;
    value: string;
    updatedAt: Timestamp;
}

// Get a single content item by ID
export async function getContent(contentId: string): Promise<string | null> {
    try {
        const docRef = doc(db, COLLECTION, contentId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data().value as string;
        }
        return null;
    } catch (err) {
        console.error('Failed to get content:', contentId, err);
        return null;
    }
}

// Save a single content item
export async function saveContent(contentId: string, value: string): Promise<void> {
    const docRef = doc(db, COLLECTION, contentId);
    await setDoc(docRef, {
        value,
        updatedAt: Timestamp.now()
    }, { merge: true });
}

// Save multiple content items at once (batch write)
export async function saveMultipleContent(items: Record<string, string>): Promise<void> {
    const batch = writeBatch(db);
    const now = Timestamp.now();

    for (const [id, value] of Object.entries(items)) {
        const docRef = doc(db, COLLECTION, id);
        batch.set(docRef, { value, updatedAt: now }, { merge: true });
    }

    await batch.commit();
}

// Get all content items (used on page load to hydrate)
export async function getAllContent(): Promise<Record<string, string>> {
    try {
        const snapshot = await getDocs(collection(db, COLLECTION));
        const contents: Record<string, string> = {};
        snapshot.docs.forEach(doc => {
            contents[doc.id] = doc.data().value as string;
        });
        return contents;
    } catch (err) {
        console.error('Failed to get all content:', err);
        return {};
    }
}
