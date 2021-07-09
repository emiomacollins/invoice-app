import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import invoiceFormReducer from './invoiceFormSlice';
import invoicesReducer from './invoicesSlice';
import themeReducer from './themeSlice';

const store = configureStore({
	reducer: {
		invoices: invoicesReducer,
		theme: themeReducer,
		invoiceForm: invoiceFormReducer,
	},
	middleware: [...getDefaultMiddleware({ serializableCheck: false })],
});

export default store;
