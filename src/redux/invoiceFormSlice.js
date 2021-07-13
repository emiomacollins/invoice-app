import { createSelector, createSlice } from '@reduxjs/toolkit';

const initialState = {
	expanded: false,
	isEditing: null,
};

const invoiceFormSlice = createSlice({
	name: 'invoiceForm',
	initialState,
	reducers: {
		setFormExpanded(state, { payload: expanded }) {
			state.expanded = expanded;
		},
		setIsEditing(state, { payload: obj }) {
			state.isEditing = obj;
		},
	},
});

const invoiceFormReducer = invoiceFormSlice.reducer;
export default invoiceFormReducer;

// ACTIONS
export const { setFormExpanded, setIsEditing } = invoiceFormSlice.actions;

// SELECTORS
const getInvoiceFormState = (store) => store.invoiceForm;

export const getInvoiceFormExpanded = createSelector(
	getInvoiceFormState,
	({ expanded }) => expanded
);

export const getInvoiceFormIsEditing = createSelector(
	getInvoiceFormState,
	({ isEditing }) => isEditing
);
