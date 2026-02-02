// Database helper functions for Firestore operations

import {
    collection,
    doc,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    limit,
    Timestamp,
    DocumentData
} from 'firebase/firestore';
import { db } from './firebase';

// Collection Names
export const COLLECTIONS = {
    USERS: 'users',
    SERVICES: 'services',
    ORDERS: 'orders',
    INQUIRIES: 'inquiries',
    SETTINGS: 'settings'
};

// User Types
export type UserRole = 'admin' | 'client';

export interface User {
    id?: string;
    name: string;
    email: string;
    phone?: string;
    role: UserRole;
    createdAt: Timestamp;
    updatedAt: Timestamp;
}

// Order Types
export type OrderStatus = 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';

export interface Order {
    id?: string;
    userId: string;
    serviceId: string;
    serviceName: string;
    amount: number;
    status: OrderStatus;
    requirements?: string;
    createdAt: Timestamp;
    updatedAt: Timestamp;
}

// Inquiry Types
export interface Inquiry {
    id?: string;
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
    type: 'general' | 'quote' | 'support';
    status: 'new' | 'replied' | 'closed';
    createdAt: Timestamp;
}

// ============== USER OPERATIONS ==============

export const UsersDB = {
    // Get all users
    async getAll(): Promise<User[]> {
        const snapshot = await getDocs(collection(db, COLLECTIONS.USERS));
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as User));
    },

    // Get user by ID
    async getById(id: string): Promise<User | null> {
        const docRef = doc(db, COLLECTIONS.USERS, id);
        const docSnap = await getDoc(docRef);
        return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as User : null;
    },

    // Get user by email
    async getByEmail(email: string): Promise<User | null> {
        const q = query(collection(db, COLLECTIONS.USERS), where('email', '==', email));
        const snapshot = await getDocs(q);
        if (snapshot.empty) return null;
        const doc = snapshot.docs[0];
        return { id: doc.id, ...doc.data() } as User;
    },

    // Create user
    async create(data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
        const now = Timestamp.now();
        const docRef = await addDoc(collection(db, COLLECTIONS.USERS), {
            ...data,
            createdAt: now,
            updatedAt: now
        });
        return docRef.id;
    },

    // Update user
    async update(id: string, data: Partial<User>): Promise<void> {
        const docRef = doc(db, COLLECTIONS.USERS, id);
        await updateDoc(docRef, {
            ...data,
            updatedAt: Timestamp.now()
        });
    },

    // Delete user
    async delete(id: string): Promise<void> {
        await deleteDoc(doc(db, COLLECTIONS.USERS, id));
    }
};

// ============== ORDER OPERATIONS ==============

export const OrdersDB = {
    // Get all orders
    async getAll(): Promise<Order[]> {
        const q = query(collection(db, COLLECTIONS.ORDERS), orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order));
    },

    // Get orders by user
    async getByUser(userId: string): Promise<Order[]> {
        const q = query(
            collection(db, COLLECTIONS.ORDERS),
            where('userId', '==', userId),
            orderBy('createdAt', 'desc')
        );
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order));
    },

    // Get recent orders
    async getRecent(count: number = 10): Promise<Order[]> {
        const q = query(
            collection(db, COLLECTIONS.ORDERS),
            orderBy('createdAt', 'desc'),
            limit(count)
        );
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order));
    },

    // Create order
    async create(data: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
        const now = Timestamp.now();
        const docRef = await addDoc(collection(db, COLLECTIONS.ORDERS), {
            ...data,
            createdAt: now,
            updatedAt: now
        });
        return docRef.id;
    },

    // Update order status
    async updateStatus(id: string, status: OrderStatus): Promise<void> {
        const docRef = doc(db, COLLECTIONS.ORDERS, id);
        await updateDoc(docRef, {
            status,
            updatedAt: Timestamp.now()
        });
    }
};

// ============== INQUIRY OPERATIONS ==============

export const InquiriesDB = {
    // Get all inquiries
    async getAll(): Promise<Inquiry[]> {
        const q = query(collection(db, COLLECTIONS.INQUIRIES), orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Inquiry));
    },

    // Get new inquiries
    async getNew(): Promise<Inquiry[]> {
        const q = query(
            collection(db, COLLECTIONS.INQUIRIES),
            where('status', '==', 'new'),
            orderBy('createdAt', 'desc')
        );
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Inquiry));
    },

    // Create inquiry
    async create(data: Omit<Inquiry, 'id' | 'createdAt' | 'status'>): Promise<string> {
        const docRef = await addDoc(collection(db, COLLECTIONS.INQUIRIES), {
            ...data,
            status: 'new',
            createdAt: Timestamp.now()
        });
        return docRef.id;
    },

    // Update inquiry status
    async updateStatus(id: string, status: Inquiry['status']): Promise<void> {
        const docRef = doc(db, COLLECTIONS.INQUIRIES, id);
        await updateDoc(docRef, { status });
    }
};
