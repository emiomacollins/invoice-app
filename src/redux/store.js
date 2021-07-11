import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import invoiceFormReducer from './invoiceFormSlice';
import invoicesReducer from './invoicesSlice';
import themeReducer from './themeSlice';
import userReducer from './userSlice';

const store = configureStore({
	reducer: {
		invoices: invoicesReducer,
		theme: themeReducer,
		invoiceForm: invoiceFormReducer,
		user: userReducer,
	},
	middleware: [...getDefaultMiddleware({ serializableCheck: false })],
});

export default store;
