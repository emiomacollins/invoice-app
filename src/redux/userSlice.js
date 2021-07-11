import { createSelector, createSlice } from '@reduxjs/toolkit';

const initialState = {
	user: null,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser(state, { payload: userObj }) {
			state.user = userObj;
		},
	},
});

const userReducer = userSlice.reducer;
export default userReducer;

// ACTIONS
export const { setUser } = userSlice.actions;

// SELECTORS
const getUserState = (store) => store.user;

export const getUser = createSelector(getUserState, ({ user }) => user);
