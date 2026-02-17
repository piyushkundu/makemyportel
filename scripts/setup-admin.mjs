// One-time admin setup script
// Run: node scripts/setup-admin.mjs

import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc, Timestamp } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAerYmFA66PLpis6GE7U0Iw9n9wWOq_F5k",
    authDomain: "makemyportel.firebaseapp.com",
    projectId: "makemyportel",
    storageBucket: "makemyportel.firebasestorage.app",
    messagingSenderId: "160521439713",
    appId: "1:160521439713:web:ba9813d31a000b0dec6aa0",
    measurementId: "G-04HJ927D20"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Get email and password from command line args
const email = process.argv[2];
const password = process.argv[3];

if (!email || !password) {
    console.log('❌ Usage: node scripts/setup-admin.mjs <email> <password>');
    console.log('   Example: node scripts/setup-admin.mjs admin@makemyportal.com Admin@123');
    process.exit(1);
}

console.log(`\n🔐 Signing in as: ${email}...`);

try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    console.log(`✅ Login successful!`);
    console.log(`   UID: ${user.uid}`);
    console.log(`   Email: ${user.email}`);

    // Create admin user document in Firestore
    console.log(`\n📝 Creating admin document in Firestore...`);

    const now = Timestamp.now();
    await setDoc(doc(db, 'users', user.uid), {
        name: email.split('@')[0],
        email: user.email,
        role: 'admin',
        createdAt: now,
        updatedAt: now
    }, { merge: true });

    console.log(`✅ Admin role set successfully!`);
    console.log(`\n🎉 Done! You can now:`);
    console.log(`   1. Login at /admin with this email/password`);
    console.log(`   2. Use Live Edit on the website`);
    console.log(`   3. Only you will see the Edit Page button\n`);

    process.exit(0);
} catch (err) {
    console.log(`\n❌ Error: ${err.message}`);

    if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password') {
        console.log('   → Wrong email or password. Check Firebase Console > Authentication > Users');
    } else if (err.code === 'auth/user-not-found') {
        console.log('   → User does not exist. Create one in Firebase Console > Authentication > Add User');
    } else if (err.code === 'auth/invalid-email') {
        console.log('   → Invalid email format');
    } else if (err.code === 'auth/operation-not-allowed') {
        console.log('   → Email/Password sign-in is NOT enabled!');
        console.log('   → Go to Firebase Console > Authentication > Sign-in method > Enable Email/Password');
    } else if (err.code === 'auth/configuration-not-found') {
        console.log('   → Email/Password sign-in is NOT enabled!');
        console.log('   → Go to Firebase Console > Authentication > Sign-in method > Enable Email/Password');
    }

    process.exit(1);
}
