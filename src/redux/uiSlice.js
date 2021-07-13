import { createSelector, createSlice } from '@reduxjs/toolkit';

const initialState = {
	userProfilePopupExpanded: false,
	filterBoxExpanded: false,
};

const uiSlice = createSlice({
	name: 'ui',
	initialState,
	reducers: {
		setUserProfilePopupExpanded(state, { payload: bool }) {
			state.userProfilePopupExpanded = bool;
		},
		setFilterBoxExpanded(state, { payload: bool }) {
			state.filterBoxExpanded = bool;
		},
	},
});

// REDUCER
const uiReducer = uiSlice.reducer;
export default uiReducer;

// ACTIONS
export const { setUserProfilePopupExpanded, setFilterBoxExpanded } = uiSlice.actions;

// SELECTORS
const getUiState = (store) => store.ui;

export const getFilterBoxExpanded = createSelector(
	getUiState,
	({ filterBoxExpanded }) => filterBoxExpanded
);

export const getUserProfilePopupExpanded = createSelector(
	getUiState,
	({ userProfilePopupExpanded }) => userProfilePopupExpanded
);
