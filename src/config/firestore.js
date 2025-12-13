import 'dotenv/config';
import { initializeApp } from 'firebase/app';
// https://modularfirebase.web.app/reference/firestore_.getfirestore
import { getFirestore } from 'firebase/firestore';

export const firebaseConfig = Object.freeze({
	apiKey: process.env.FIREBASE_API_KEY,
	authDomain: process.env.FIREBASE_AUTH_DOMAIN,
	projectId: process.env.FIREBASE_PROJECT_ID,
	storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.FIREBASE_APP_ID,
	measurementId: process.env.FIREBASE_MEASUREMENT_ID,
});

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
