import 'firebase';
import { firebaseConfig } from './config';

export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const firebaseAuth = firebaseApp.auth();
export const firebaseGoogleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const firebaseDb = firebaseApp.database();