import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "../services/userService";

const initialState = {
	user: {},
	error: false,
	success: false,
	loading: false,
	message: null,
};

// Get user details
export const profile = createAsyncThunk(
	"user/profile",
	async (user, thunkAPI) => {
		const token = thunkAPI.getState().auth.user.token;

		const data = await userService.profile(user, token);

		return data;
	}
);

// Update user datails
export const updateProfile = createAsyncThunk(
	"user/update",
	async (user, thunkAPI) => {
		const token = thunkAPI.getState().auth.user.token;

		const data = await userService.updateProfile(user, token);

		// Check for errors
		if (data.errors) {
			return thunkAPI.rejectWithValue(data.errors[0]);
		}

		return data;
	}
);

// Get user datails
export const getUserDetails = createAsyncThunk("user/get", async (id) => {
	const data = await userService.getUserDetails(id);

	return data;
});

// Get user by name
export const searchUsers = createAsyncThunk("user/search", async (query) => {
	const data = await userService.searchUsers(query);

	return data;
});

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		resetMessage: (state) => {
			state.message = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(profile.pending, (state) => {
				state.loading = true;
				state.error = false;
			})
			.addCase(profile.fulfilled, (state, action) => {
				state.loading = false;
				state.error = null;
				state.success = true;
				state.user = action.payload;
			})
			.addCase(updateProfile.pending, (state) => {
				state.loading = true;
				state.error = false;
			})
			.addCase(updateProfile.fulfilled, (state, action) => {
				state.loading = false;
				state.error = null;
				state.success = true;
				state.user = action.payload;
				state.message = "User updated successfully.";
			})
			.addCase(updateProfile.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
				state.user = {};
			})
			.addCase(getUserDetails.pending, (state) => {
				state.loading = true;
				state.error = false;
			})
			.addCase(getUserDetails.fulfilled, (state, action) => {
				state.loading = false;
				state.error = null;
				state.success = true;
				state.user = action.payload;
			})
			.addCase(searchUsers.pending, (state) => {
				state.loading = false;
				state.error = false;
			})
			.addCase(searchUsers.fulfilled, (state, action) => {
				state.loading = false;
				state.error = null;
				state.success = true;
				state.users = action.payload;
			});
	},
});

export const { resetMessage } = userSlice.actions;
export default userSlice.reducer;
