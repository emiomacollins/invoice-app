import { createSelector, createSlice } from '@reduxjs/toolkit';
import mockData from './invoicesMockData.json';

const initialState = {
	invoices: mockData,
	filter: '',
};

const invoicesSlice = createSlice({
	name: 'invoices',
	initialState,
	reducers: {
		addInvoice: (state, { payload: invoice }) => {
			state.invoices.push(invoice);
		},

		updateInvoice: (state, { payload: newInvoice }) => {
			state.invoices = state.invoices.map((invoice) =>
				invoice.id === newInvoice.id ? newInvoice : invoice
			);
		},

		deleteInvoice: (state, { payload: id }) => {
			state.invoices = state.invoices.filter((invoice) => invoice.id !== id);
		},

		setInvoicesFilter: (state, { payload: filter }) => {
			state.filter = filter;
		},
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

export const getFilteredInvoices = createSelector(
	getInvoicesState,
	({ invoices, filter }) =>
		invoices.filter((invoice) => invoice.status.includes(filter))
);

export const getInvoicesTotal = createSelector(
	getFilteredInvoices,
	(invoices) => invoices.length
);
