// your firebase related functions if you use firebase in this project

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
	apiKey: process.env.REACT_APP_APIKEY,
	authDomain: process.env.REACT_APP_AUTHDOMAIN,
	projectId: process.env.REACT_APP_PROJECTID,
	storageBucket: process.env.REACT_APP_STORAGEBUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
	appId: process.env.REACT_APP_APPID,
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

// function to upload MockData to firestore
export function uploadInvoices(authUser, invoices) {
	const invoicesRef = firestore.collection(`users/${authUser.uid}/invoices`);
	const batch = firestore.batch();

	invoices.forEach((invoice) => {
		const newDocumentRef = invoicesRef.doc();

		batch.set(newDocumentRef, {
			...invoice,
			id: newDocumentRef.id,
			createdAt: new Date(invoice.createdAt).toISOString(),
			paymentDue: new Date(invoice.paymentDue).toISOString(),
		});
	});

	batch.commit();
}
