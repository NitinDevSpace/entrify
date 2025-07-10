import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
	name: "users",
	initialState: {
		user: null,
	},
	reducers: {
		SetUser: (state, action) => {
			state.user = action.payload; // this adds the null value of the user to the value passed in th payload
		},
	},
});

export const { SetUser } = usersSlice.actions;
export default usersSlice.reducer;
