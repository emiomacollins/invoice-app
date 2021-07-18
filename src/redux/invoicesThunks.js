import { createAsyncThunk } from '@reduxjs/toolkit';
import { firestore } from '../firebase/firebaseUtil';

// FETCH INVOICES
export const fetchInvoices = createAsyncThunk(
	'invoices/fetchInvoices',
	async (payload, { getState }) => {
		const {
			user: { user },
		} = getState();

		const invoicesRef = firestore
			.collection(`users/${user.uid}/invoices`)
			// fix
			.orderBy('createdAt');
		const snapShot = await invoicesRef.get();

		// firestore does not throw errors
		if (snapShot.empty && snapShot.metadata.fromCache)
			throw new Error('failed to fetch invoices');

		const invoices = {};
		snapShot.docs.forEach((doc) => {
			invoices[doc.id] = { ...doc.data(), id: doc.id };
		});

		return invoices;
	}
);

// ADD INVOICE
export const addInvoice = createAsyncThunk(
	'invoices/addInvoice',
	async (invoice, { getState }) => {
		const {
			user: { user },
		} = getState();

		const invoicesRef = firestore.collection(`users/${user.uid}/invoices`);

		// let firestore generate the id
		const invoiceRef = await invoicesRef.add(invoice);
		return { ...invoice, id: invoiceRef.id };
	}
);

// UPDATE INVOICE
export const updateInvoice = createAsyncThunk(
	'invoices/updateInvoice',
	async (newInvoice, { getState }) => {
		const {
			user: { user },
		} = getState();

		const invoiceRef = firestore.doc(`users/${user.uid}/invoices/${newInvoice.id}`);
		const { id, ...withoutId } = newInvoice;
		await invoiceRef.set(withoutId);
		return newInvoice;
	}
);

// DELETE INVOICE
export const deleteInvoice = createAsyncThunk(
	'invoices/deleteInvoice',
	async (id, { getState }) => {
		const {
			user: { user },
		} = getState();

		const documentRef = firestore.doc(`users/${user.uid}/invoices/${id}`);
		await documentRef.delete();
		return id;
	}
);
