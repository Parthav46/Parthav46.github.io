// Firebase configuration and initialization
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBFzZeKWmXA_zWg8qMpIYhDRX3CW8loOKg',
  authDomain: 'parthav-profile.firebaseapp.com',
  projectId: 'parthav-profile',
  storageBucket: 'parthav-profile.firebasestorage.app',
  messagingSenderId: '395304363340',
  appId: '1:395304363340:web:9237a4a87d9c3dba631be9',
  measurementId: 'G-63X32DKZHQ',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
