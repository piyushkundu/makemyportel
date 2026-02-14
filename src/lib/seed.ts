// Database seeding utility for initializing Firestore collections
// Run this from the admin panel setup page

import {
    collection,
    doc,
    setDoc,
    getDocs,
    Timestamp
} from 'firebase/firestore';
import { db } from './firebase';

export async function seedDatabase() {
    const results: string[] = [];

    // 1. Create 'settings' collection with default site settings
    try {
        const settingsRef = doc(db, 'settings', 'site');
        await setDoc(settingsRef, {
            siteName: 'MakeMyPortal',
            tagline: 'Your Digital Service Portal',
            email: 'hello@makemyportal.com',
            phone: '+91 98765 43210',
            whatsapp: '+91 98765 43210',
            address: 'India',
            currency: 'INR',
            currencySymbol: '₹',
            pricingNote: 'Prices may vary based on requirements.',
            hostingNote: 'Hosting charges are optional and depend on third-party providers.',
            updatedAt: Timestamp.now()
        }, { merge: true });
        results.push('✅ settings collection created');
    } catch (err) {
        results.push('❌ settings: ' + (err instanceof Error ? err.message : 'failed'));
    }

    // 2. Ensure 'users' collection exists (check if empty, explain)
    try {
        const usersSnap = await getDocs(collection(db, 'users'));
        if (usersSnap.empty) {
            results.push('ℹ️ users collection is empty — users will be added when clients sign up');
        } else {
            results.push(`✅ users collection exists (${usersSnap.size} users)`);
        }
    } catch (err) {
        results.push('❌ users: ' + (err instanceof Error ? err.message : 'failed'));
    }

    // 3. Ensure 'orders' collection exists
    try {
        const ordersSnap = await getDocs(collection(db, 'orders'));
        if (ordersSnap.empty) {
            results.push('ℹ️ orders collection is empty — orders will appear when clients place orders');
        } else {
            results.push(`✅ orders collection exists (${ordersSnap.size} orders)`);
        }
    } catch (err) {
        results.push('❌ orders: ' + (err instanceof Error ? err.message : 'failed'));
    }

    // 4. Ensure 'inquiries' collection exists
    try {
        const inquiriesSnap = await getDocs(collection(db, 'inquiries'));
        if (inquiriesSnap.empty) {
            results.push('ℹ️ inquiries collection is empty — will populate from contact form submissions');
        } else {
            results.push(`✅ inquiries collection exists (${inquiriesSnap.size} inquiries)`);
        }
    } catch (err) {
        results.push('❌ inquiries: ' + (err instanceof Error ? err.message : 'failed'));
    }

    // 5. Ensure 'services' collection exists
    try {
        const servicesSnap = await getDocs(collection(db, 'services'));
        if (servicesSnap.empty) {
            results.push('ℹ️ services collection is empty — services are managed from services.json');
        } else {
            results.push(`✅ services collection exists (${servicesSnap.size} services)`);
        }
    } catch (err) {
        results.push('❌ services: ' + (err instanceof Error ? err.message : 'failed'));
    }

    return results;
}

// Create admin user document in Firestore (call after Firebase Auth user is created)
export async function createAdminUserDoc(uid: string, email: string, name: string) {
    const userRef = doc(db, 'users', uid);
    await setDoc(userRef, {
        name,
        email,
        role: 'admin',
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
    }, { merge: true });
}
