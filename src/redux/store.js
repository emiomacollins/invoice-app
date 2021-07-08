import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import invoicesReducer from './invoicesSlice';
import themeReducer from './themeSlice';

const store = configureStore({
	reducer: {
		invoices: invoicesReducer,
		theme: themeReducer,
	},
	middleware: [...getDefaultMiddleware({ serializableCheck: false })],
});

export default store;
