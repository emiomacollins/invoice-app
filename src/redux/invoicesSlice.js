import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	invoices: [],
};

const invoicesSlice = createSlice({
	name: 'invoices',
	initialState,
	reducers: {},
});

const invoicesReducer = invoicesSlice.reducer;
export default invoicesReducer;

// ACTIONS

// SELECTORS
