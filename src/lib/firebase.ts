import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getFirestore, type Firestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ?? '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ?? '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ?? '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ?? '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ?? '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID ?? '',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID ?? '',
};

const hasFirebaseConfig = Boolean(firebaseConfig.projectId);

let app: FirebaseApp | null = null;
let firestore: Firestore | null = null;

if (hasFirebaseConfig) {
  app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
  firestore = getFirestore(app);
}

export const db = firestore;
export const isFirebaseConfigured = hasFirebaseConfig;
