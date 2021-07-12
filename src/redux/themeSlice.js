import { createSelector, createSlice } from '@reduxjs/toolkit';
import { LOCAL_STORAGE_THEME_KEY } from '../config';

const initialState = {
	theme: JSON.parse(localStorage.getItem(LOCAL_STORAGE_THEME_KEY)) || 'darkmode',
};

const themeSlice = createSlice({
	name: 'theme',
	initialState,
	reducers: {
		toggleTheme: (state) => {
			state.theme = state.theme === 'darkmode' ? 'lightmode' : 'darkmode';
		},
	},
});

const themeReducer = themeSlice.reducer;
export default themeReducer;

// ACTIONS
export const { toggleTheme } = themeSlice.actions;

// SELECTORS
const getThemeState = (store) => store.theme;
export const getTheme = createSelector(getThemeState, ({ theme }) => theme);
