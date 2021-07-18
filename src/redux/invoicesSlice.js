import { createSelector, createSlice } from '@reduxjs/toolkit';
import {
	addInvoice,
	deleteInvoice,
	fetchInvoices,
	updateInvoice,
} from './invoicesThunks';

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
