import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { firestore } from '../firebase/firebaseUtil';
// import mockData from './invoicesMockData.json';

const initialState = {
	invoices: [],
	filter: '',
	isFetching: 'idle',
};

export const fetchInvoices = createAsyncThunk('invoices/fetchInvoices', async (uid) => {
	const invoicesRef = firestore.collection(`users/${uid}/invoices`);
	const snapShot = await invoicesRef.get();
	if (snapShot.empty) return [];
	const invoices = snapShot.docs.map((document) => document.data());
	return invoices;
});

const invoicesSlice = createSlice({
	name: 'invoices',
	initialState,
	reducers: {
		addInvoice: (state, { payload: invoice }) => {
			state.invoices.push(invoice);
			// change to thunk and add to backend too
		},

		updateInvoice: (state, { payload: newInvoice }) => {
			state.invoices = state.invoices.map((invoice) =>
				invoice.id === newInvoice.id ? newInvoice : invoice
			);
			// use getstate in thunk to get user id and update corresponding document
			// ideas chande invoices to an obj mapping firestore id to each obj as a property in invoices
			// to update
		},

		deleteInvoice: (state, { payload: id }) => {
			state.invoices = state.invoices.filter((invoice) => invoice.id !== id);
		},

		setInvoicesFilter: (state, { payload: filter }) => {
			state.filter = filter;
		},
	},
	extraReducers: (builder) => {
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
	},
});

const invoicesReducer = invoicesSlice.reducer;
export default invoicesReducer;

// ACTIONS
export const { setInvoicesFilter, deleteInvoice, updateInvoice, addInvoice } =
	invoicesSlice.actions;

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
		invoices.filter((invoice) => invoice.status.includes(filter)).reverse()
);

export const getInvoicesTotal = createSelector(
	getFilteredInvoices,
	(invoices) => invoices.length
);
