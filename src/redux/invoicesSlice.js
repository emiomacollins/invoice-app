import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { firestore } from '../firebase/firebaseUtil';
// import mockData from './invoicesMockData.json';

// THUNKS
export const fetchInvoices = createAsyncThunk(
	'invoices/fetchInvoices',
	async (payload, { getState }) => {
		const {
			user: { user },
		} = getState();

		const invoicesRef = firestore.collection(`users/${user.uid}/invoices`);
		const snapShot = await invoicesRef.get();
		if (snapShot.empty) return {};

		const invoices = {};
		snapShot.docs.forEach((document) => {
			invoices[document.id] = document.data();
		});

		return invoices;
	}
);

export const addInvoice = createAsyncThunk(
	'invoices/addInvoice',
	async (invoice, { getState }) => {
		const {
			user: { user },
		} = getState();

		const { uid } = user;
		const invoicesRef = firestore.collection(`users/${uid}/invoices`);
		const invoiceDocument = invoicesRef.doc();
		const invoiceWithId = { ...invoice, id: invoiceDocument.id };
		await invoiceDocument.set(invoiceWithId);
		return invoiceWithId;
	}
);

export const updateInvoice = createAsyncThunk(
	'invoices/updateInvoice',
	async (newInvoice, { getState }) => {
		const {
			user: { user },
		} = getState();

		const { uid } = user;
		const invoiceRef = firestore.doc(`users/${uid}/invoices/${newInvoice.id}`);
		await invoiceRef.set(newInvoice);
		return newInvoice;
	}
);

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

// SLICE DEFINITION
const initialState = {
	invoices: null,
	filter: '',
	isFetching: 'idle',
	invoiceOperationSuccess: false,
	invoiceOperationPending: false,
};

const invoicesSlice = createSlice({
	name: 'invoices',
	initialState,
	reducers: {
		setInvoicesFilter(state, { payload: filter }) {
			state.filter = filter;
		},
		resetInvoices(state) {
			state.invoices = [];
			state.filter = '';
			state.isFetching = 'idle';
		},
		setInvoiceOperationSuccess(state, { payload: bool }) {
			state.invoiceOperationSuccess = bool;
		},
	},

	extraReducers: (builder) => {
		// FETCH INVOICE
		builder.addCase(fetchInvoices.pending, (state) => {
			state.isFetching = true;
		});
		builder.addCase(fetchInvoices.fulfilled, (state, { payload: invoices }) => {
			state.invoices = invoices;
			state.isFetching = false;
		});
		builder.addCase(fetchInvoices.rejected, (state) => {
			state.isFetching = false;
		});

		// ADD INVOICE
		builder.addCase(addInvoice.pending, (state) => {
			state.invoiceOperationPending = true;
		});
		builder.addCase(addInvoice.fulfilled, (state, { payload: invoice }) => {
			state.invoiceOperationSuccess = true;
			state.invoiceOperationPending = false;
			state.invoices[invoice.id] = invoice;
		});

		// UPDATE INVOICE
		builder.addCase(updateInvoice.pending, (state, { payload: newInvoice }) => {
			state.invoiceOperationPending = true;
		});
		builder.addCase(updateInvoice.fulfilled, (state, { payload: newInvoice }) => {
			state.invoiceOperationSuccess = true;
			state.invoiceOperationPending = false;
			state.invoices[newInvoice.id] = newInvoice;
		});

		// DELETE INVOICE
		builder.addCase(deleteInvoice.pending, (state, { payload: id }) => {
			state.invoiceOperationPending = true;
		});
		builder.addCase(deleteInvoice.fulfilled, (state, { payload: id }) => {
			state.invoiceOperationSuccess = true;
			state.invoiceOperationPending = false;
			delete state.invoices[id];
		});
	},
});

// REDUCER
const invoicesReducer = invoicesSlice.reducer;
export default invoicesReducer;

// ACTIONS
export const {
	setInvoicesFilter,
	resetInvoices,
	setInvoiceOperationSuccess,
	setInvoiceOperationPending,
} = invoicesSlice.actions;

// SELECTORS
const getInvoicesState = (store) => store.invoices;
export const getInvoices = createSelector(getInvoicesState, ({ invoices }) => invoices);
export const getInvoicesFilter = createSelector(getInvoicesState, ({ filter }) => filter);

export const getIsFetchingInvoices = createSelector(
	getInvoicesState,
	({ isFetching }) => isFetching
);

export const getFilteredInvoices = createSelector(
	getInvoicesState,
	({ invoices, filter }) =>
		invoices
			? Object.values(invoices)
					.filter((invoice) => invoice.status.includes(filter))
					.sort((a, b) =>
						new Date(a.createdAt).getTime() > new Date(b.createdAt).getTime()
							? -1
							: 1
					)
			: null
);

export const getInvoicesTotal = createSelector(getFilteredInvoices, (invoices) =>
	invoices ? Object.keys(invoices).length : null
);

export const getInvoiceOperationSuccess = createSelector(
	getInvoicesState,
	({ invoiceOperationSuccess }) => invoiceOperationSuccess
);

export const getInvoiceOperationPending = createSelector(
	getInvoicesState,
	({ invoiceOperationPending }) => invoiceOperationPending
);
