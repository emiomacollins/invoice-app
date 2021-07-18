import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { firestore } from '../firebase/firebaseUtil';

// THUNKS
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
	fetchingStatus: 'idle',
	operationStatus: 'idle',
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
			state.fetchingStatus = 'idle';
		},

		// for reseting
		setInvoiceOperationStatus(state, { payload: status }) {
			state.operationStatus = status;
		},
	},

	extraReducers: (builder) => {
		// FETCH INVOICE
		builder.addCase(fetchInvoices.pending, (state) => {
			state.fetchingStatus = 'pending';
		});
		builder.addCase(fetchInvoices.fulfilled, (state, { payload: invoices }) => {
			state.invoices = invoices;
			state.fetchingStatus = 'fufilled';
		});
		builder.addCase(fetchInvoices.rejected, (state, error) => {
			console.log(error);
			state.fetchingStatus = 'rejected';
		});

		// SET PENDING STATE
		[addInvoice, deleteInvoice, updateInvoice].forEach((actionType, i) => {
			builder.addCase(actionType.pending, (state) => {
				state.operationStatus = 'pending';
			});
		});

		// SET PENDING STATE & LOG ERRORS ON FAILED OPERATIONS
		// todo (show ui message later)
		[addInvoice, deleteInvoice, updateInvoice].forEach((actionType) => {
			builder.addCase(actionType.rejected, (state, error) => {
				state.operationStatus = 'rejected';
				console.log(error);
			});
		});

		// ADD INVOICE
		builder.addCase(addInvoice.fulfilled, (state, { payload: invoice }) => {
			state.operationStatus = 'fufilled';
			state.invoices[invoice.id] = invoice;
		});

		// UPDATE INVOICE
		builder.addCase(updateInvoice.fulfilled, (state, { payload: newInvoice }) => {
			state.operationStatus = 'fufilled';
			state.invoices[newInvoice.id] = newInvoice;
		});

		// DELETE INVOICE
		builder.addCase(deleteInvoice.fulfilled, (state, { payload: id }) => {
			state.operationStatus = 'fufilled';
			delete state.invoices[id];
		});
	},
});

// REDUCER
const invoicesReducer = invoicesSlice.reducer;
export default invoicesReducer;

// ACTIONS
export const { setInvoicesFilter, resetInvoices, setInvoiceOperationStatus } =
	invoicesSlice.actions;

// SELECTORS
const getInvoicesState = (store) => store.invoices;
export const getInvoices = createSelector(getInvoicesState, ({ invoices }) => invoices);
export const getInvoicesFilter = createSelector(getInvoicesState, ({ filter }) => filter);

export const getFilteredInvoices = createSelector(
	getInvoicesState,
	({ invoices, filter }) =>
		invoices
			? Object.values(invoices).filter((invoice) => invoice.status.includes(filter))
			: null
);

export const getInvoicesTotal = createSelector(getFilteredInvoices, (invoices) =>
	invoices ? Object.keys(invoices).length : null
);

export const getInvoicesFetchingStatus = createSelector(
	getInvoicesState,
	({ fetchingStatus }) => fetchingStatus
);

export const getInvoiceOperationStatus = createSelector(
	getInvoicesState,
	({ operationStatus }) => operationStatus
);
