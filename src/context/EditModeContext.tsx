'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { getAllContent, saveContent as saveContentToDb, saveMultipleContent } from '@/lib/content';

interface EditModeContextType {
    isAdmin: boolean;
    editMode: boolean;
    toggleEditMode: () => void;
    contents: Record<string, string>;
    pendingChanges: Record<string, string>;
    updateContent: (id: string, value: string) => void;
    saveAll: () => Promise<void>;
    saving: boolean;
    hasChanges: boolean;
    changesCount: number;
}

const EditModeContext = createContext<EditModeContextType>({
    isAdmin: false,
    editMode: false,
    toggleEditMode: () => { },
    contents: {},
    pendingChanges: {},
    updateContent: () => { },
    saveAll: async () => { },
    saving: false,
    hasChanges: false,
    changesCount: 0,
});

export function EditModeProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [contents, setContents] = useState<Record<string, string>>({});
    const [pendingChanges, setPendingChanges] = useState<Record<string, string>>({});
    const [saving, setSaving] = useState(false);

    // Check auth and verify admin role from Firestore
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
            setUser(firebaseUser);
            if (firebaseUser) {
                try {
                    // Check by UID first (admin setup page saves with UID as doc ID)
                    const { doc: firestoreDoc, getDoc } = await import('firebase/firestore');
                    const { db } = await import('@/lib/firebase');

                    // Try getting user doc by UID
                    const userDocRef = firestoreDoc(db, 'users', firebaseUser.uid);
                    const userDocSnap = await getDoc(userDocRef);

                    if (userDocSnap.exists() && userDocSnap.data().role === 'admin') {
                        setIsAdmin(true);
                        return;
                    }

                    // Fallback: check by email query
                    const { collection, query, where, getDocs } = await import('firebase/firestore');
                    const q = query(collection(db, 'users'), where('email', '==', firebaseUser.email));
                    const snapshot = await getDocs(q);
                    if (!snapshot.empty) {
                        const userData = snapshot.docs[0].data();
                        setIsAdmin(userData.role === 'admin');
                    } else {
                        setIsAdmin(false);
                    }
                } catch (err) {
                    console.error('Admin check failed:', err);
                    setIsAdmin(false);
                }
            } else {
                setIsAdmin(false);
                setEditMode(false);
            }
        });
        return () => unsub();
    }, []);

    // Load all content from Firestore on mount
    useEffect(() => {
        const loadContent = async () => {
            try {
                const data = await getAllContent();
                setContents(data);
            } catch (err) {
                console.error('Failed to load content:', err);
            }
        };
        loadContent();
    }, []);

    // Check URL param for edit mode trigger
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            if (params.get('editMode') === 'true') {
                // Auto-enable edit mode even before auth check completes
                // It will show the bar once isAdmin becomes true
                setEditMode(true);
            }
        }
    }, []);

    const toggleEditMode = useCallback(() => {
        setEditMode(prev => !prev);
    }, []);

    const updateContent = useCallback((id: string, value: string) => {
        setPendingChanges(prev => ({ ...prev, [id]: value }));
        setContents(prev => ({ ...prev, [id]: value }));
    }, []);

    const saveAll = useCallback(async () => {
        if (Object.keys(pendingChanges).length === 0) return;
        setSaving(true);
        try {
            await saveMultipleContent(pendingChanges);
            setPendingChanges({});
        } catch (err) {
            console.error('Failed to save content:', err);
            alert('Failed to save changes. Please try again.');
        } finally {
            setSaving(false);
        }
    }, [pendingChanges]);

    const hasChanges = Object.keys(pendingChanges).length > 0;
    const changesCount = Object.keys(pendingChanges).length;

    return (
        <EditModeContext.Provider value={{
            isAdmin,
            editMode: editMode && isAdmin,
            toggleEditMode,
            contents,
            pendingChanges,
            updateContent,
            saveAll,
            saving,
            hasChanges,
            changesCount,
        }}>
            {children}
        </EditModeContext.Provider>
    );
}

export function useEditMode() {
    return useContext(EditModeContext);
}

export default EditModeContext;
