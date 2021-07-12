import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import shortid from 'shortid';
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
	const invoices = {};
	snapShot.docs.map((document) => {
		return (invoices[document.id] = { ...document.data(), id: document.id });
	});
	return invoices;
});

export const addInvoice = createAsyncThunk(
	'invoices/addInvoice',
	async (invoice, { getState }) => {
		const {
			user: { user },
		} = getState();

		const { uid } = user;

		const invoicesRef = firestore.collection(`users/${uid}/invoices`);
		const invoiceDocument = await invoicesRef.add(invoice);
		return { ...invoice, id: invoiceDocument.id };
	}
);

export const updateInvoice = createAsyncThunk('invoices/addInvoice', (newInvoice) => {
	// use getstate in thunk to get user id and update corresponding document
	// ideas chande invoices to an obj mapping firestore id to each obj as a property in invoices
	// to update
});

export const deleteInvoice = createAsyncThunk('invoices/addInvoice', (id) => {});

const invoicesSlice = createSlice({
	name: 'invoices',
	initialState,
	reducers: {
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

		builder.addCase(addInvoice.fulfilled, (state, { payload: invoice }) => {
			state.invoices[invoice.id] = invoice;
		});

		// builder.addCase(updateInvoice.fulfilled, (state, { payload: newInvoice }) => {
		// 	state.invoices[newInvoice.id] = newInvoice;
		// });

		// builder.addCase(deleteInvoice.fulfilled, (state, { payload: id }) => {
		// 	delete state.invoices[id];
		// });
	},
});

const invoicesReducer = invoicesSlice.reducer;
export default invoicesReducer;

// ACTIONS
export const { setInvoicesFilter } = invoicesSlice.actions;

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
		Object.values(invoices)
			.filter((invoice) => invoice.status.includes(filter))
			.sort((a, b) =>
				new Date(a.createdAt).getTime() > new Date(b.createdAt).getTime() ? -1 : 1
			)
);

export const getInvoicesTotal = createSelector(
	getFilteredInvoices,
	(invoices) => Object.keys(invoices).length
);
