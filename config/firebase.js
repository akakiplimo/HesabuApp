import Config from 'react-native-config';
// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth} from 'firebase/auth';
import {getFirestore, collection} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: Config.REACT_NATIVE_FIREBASE_API_KEY,
  authDomain: Config.REACT_NATIVE_FIREBASE_AUTH_DOMAIN,
  projectId: Config.REACT_NATIVE_FIREBASE_PROJECT_ID,
  storageBucket: Config.REACT_NATIVE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: Config.REACT_NATIVE_FIREBASE_APP_SENDER_ID,
  appId: Config.REACT_NATIVE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export const tripsRef = collection(db, 'trips');
export const expensesRef = collection(db, 'expenses');

export default app;
