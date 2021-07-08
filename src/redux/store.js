import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import invoicesReducer from './invoicesSlice';

const store = configureStore({
	reducer: {
		invoices: invoicesReducer,
	},
	middleware: [...getDefaultMiddleware({ serializableCheck: false })],
});

export default store;
