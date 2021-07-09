import { createSelector, createSlice } from '@reduxjs/toolkit';
import InvoiceForm from '../components/Home/InvoiceForm';

const initialState = {
	expanded: false,
};

const invoiceFormSlice = createSlice({
	name: 'invoiceForm',
	initialState,
	reducers: {
		toggleExpanded(state) {
			state.expanded = !state.expanded;
		},
	},
});

const invoiceFormReducer = invoiceFormSlice.reducer;
export default invoiceFormReducer;

// ACTIONS
export const { toggleExpanded } = invoiceFormSlice.actions;

// SELECTORS
const getInvoiceFormState = createSelector(({ invoiceForm }) => InvoiceForm);
export const getInvoiceFormExpanded = createSelector(
	getInvoiceFormState,
	({ expanded }) => expanded
);
