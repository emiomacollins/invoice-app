// your firebase related functions if you use firebase in this project

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
	apiKey: 'AIzaSyAIDOLCt3oyuY3KwDXgF75M1FzWoTivSck',
	authDomain: 'invoice-app-v1.firebaseapp.com',
	projectId: 'invoice-app-v1',
	storageBucket: 'invoice-app-v1.appspot.com',
	messagingSenderId: '669700947749',
	appId: '1:669700947749:web:51170f35d4e63724a0e4cc',
};
// Initialize Firebase
!firebase.apps.length && firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const googleProvider = new firebase.auth.GoogleAuthProvider();

export function signInWithGoogle() {
	auth.signInWithPopup(googleProvider);
}

export function signInAsGuest() {
	auth.signInAnonymously();
}
