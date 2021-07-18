import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';

export const chechInternetConnection = createAsyncThunk(
	'ui/checkInternetConnection',
	(params, { dispatch }) => {
		window.addEventListener('online', () => dispatch(setUiMessage('')));
		window.addEventListener('offline', () =>
			dispatch(setUiMessage('Check your internet'))
		);
	}
);

const initialState = {
	userProfilePopupExpanded: false,
	filterBoxExpanded: false,
	message: '',
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
		setUiMessage(state, { payload: message }) {
			state.message = message;
		},
	},
});

// REDUCER
const uiReducer = uiSlice.reducer;
export default uiReducer;

// ACTIONS
export const { setUserProfilePopupExpanded, setFilterBoxExpanded, setUiMessage } =
	uiSlice.actions;

// SELECTORS
const getUiState = (store) => store.ui;

export const getUiMessage = createSelector(getUiState, ({ message }) => message);

export const getFilterBoxExpanded = createSelector(
	getUiState,
	({ filterBoxExpanded }) => filterBoxExpanded
);

export const getUserProfilePopupExpanded = createSelector(
	getUiState,
	({ userProfilePopupExpanded }) => userProfilePopupExpanded
);
