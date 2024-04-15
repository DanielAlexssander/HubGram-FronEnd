import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import photoService from "../services/photoService";

const initialState = {
	photos: [],
	photo: {},
	error: false,
	loading: false,
	success: false,
	message: null,
};

// Publish user photo
export const publishPhoto = createAsyncThunk(
	"photo/publish",
	async (photo, thunkAPI) => {
		const token = thunkAPI.getState().auth.user.token;

		const data = await photoService.publishPhoto(photo, token);

		// Check for errors
		if (data.errors) {
			return thunkAPI.rejectWithValue(data.errors[0]);
		}

		return data;
	}
);

// Get user photos
export const getUserPhotos = createAsyncThunk(
	"photo/userphotos",
	async (id) => {
		const data = await photoService.getUserPhotos(id);

		return data;
	}
);

// Delte a photo
export const deletePhoto = createAsyncThunk(
	"photo/delete",
	async (id, thunkAPI) => {
		const token = thunkAPI.getState().auth.user.token;

		const data = await photoService.deletePhoto(id, token);

		// Check for errors
		if (data.errors) {
			return thunkAPI.rejectWithValue(data.errors[0]);
		}

		return data;
	}
);

// Update a photo
export const updatePhoto = createAsyncThunk(
	"photo/update",
	async (photoData, thunkAPI) => {
		const token = thunkAPI.getState().auth.user.token;

		const data = await photoService.updatePhoto(
			{ title: photoData.title },
			photoData._id,
			token
		);

		// Check for errors
		if (data.errors) {
			return thunkAPI.rejectWithValue(data.errors[0]);
		}

		return data;
	}
);

// Get photo by id
export const getPhoto = createAsyncThunk("photo/getphoto", async (id) => {
	const data = await photoService.getPhoto(id);

	return data;
});

// Like a photo
export const likePhoto = createAsyncThunk(
	"photo/like",
	async (id, thunkAPI) => {
		const token = thunkAPI.getState().auth.user.token;

		const data = await photoService.likePhoto(id, token);

		// Check for errors
		if (data.errors) {
			return thunkAPI.rejectWithValue(data.errors[0]);
		}

		return data;
	}
);

// Add Comment
export const commentPhoto = createAsyncThunk(
	"photo/comment",
	async (commentData, thunkAPI) => {
		const token = thunkAPI.getState().auth.user.token;

		const data = await photoService.commentPhoto(
			{ comment: commentData.comment },
			commentData.id,
			token
		);

		// Check for errors
		if (data.errors) {
			return thunkAPI.rejectWithValue(data.errors[0]);
		}

		return data;
	}
);

// Get all photos
export const getPhotos = createAsyncThunk("photo/getall", async () => {
	const data = await photoService.getPhotos();

	return data;
});

// Delte a comment
export const deleteComment = createAsyncThunk(
	"photo/deleteComment",
	async (id, thunkAPI) => {
		const token = thunkAPI.getState().auth.user.token;

		const data = await photoService.deleteComment(id, token);

		// Check for errors
		if (data.errors) {
			return thunkAPI.rejectWithValue(data.errors[0]);
		}

		return data;
	}
);

export const photoSlice = createSlice({
	name: "photo",
	initialState,
	reducers: {
		resetMessage: (state) => {
			state.message = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(publishPhoto.pending, (state) => {
				state.loading = true;
				state.error = false;
			})
			.addCase(publishPhoto.fulfilled, (state, action) => {
				state.loading = false;
				state.error = null;
				state.success = true;
				state.photo = action.payload;
				state.photos.unshift(state.photo);
				state.message = "Photo successfully published!";
			})
			.addCase(publishPhoto.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
				state.photo = {};
			})
			.addCase(getUserPhotos.pending, (state) => {
				state.loading = true;
				state.error = false;
			})
			.addCase(getUserPhotos.fulfilled, (state, action) => {
				state.loading = false;
				state.error = null;
				state.success = true;
				state.photos = action.payload;
			})
			.addCase(deletePhoto.pending, (state) => {
				state.loading = true;
				state.error = false;
			})
			.addCase(deletePhoto.fulfilled, (state, action) => {
				state.loading = false;
				state.error = null;
				state.success = true;
				state.photos = state.photos.filter((photo) => {
					return photo._id !== action.payload.id;
				});
				state.message = action.payload.message;
			})
			.addCase(deletePhoto.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
				state.photo = {};
			})
			.addCase(updatePhoto.pending, (state) => {
				state.loading = true;
				state.error = false;
			})
			.addCase(updatePhoto.fulfilled, (state, action) => {
				state.loading = false;
				state.error = null;
				state.success = true;
				state.photos.map((photo) => {
					if (photo._id === action.payload.photo._id) {
						return (photo.title = action.payload.photo.title);
					}
					return photo;
				});
				state.message = action.payload.message;
			})
			.addCase(updatePhoto.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
				state.photo = {};
			})
			.addCase(getPhoto.pending, (state) => {
				state.loading = true;
				state.error = false;
			})
			.addCase(getPhoto.fulfilled, (state, action) => {
				state.loading = false;
				state.error = null;
				state.success = true;
				state.photo = action.payload;
			})
			.addCase(likePhoto.fulfilled, (state, action) => {
				state.loading = false;
				state.error = null;
				state.success = true;

				if (state.photo.likes) {
					if (!state.photo.likes.includes(action.payload.userId)) {
						state.photo.likes.push(action.payload.userId);
					} else {
						let index = state.photo.likes.indexOf(action.payload.userId);
						state.photo.likes.splice(index, 1);
					}
				}

				state.photos.map((photo) => {
					if (photo._id === action.payload.photoId) {
						if (!photo.likes.includes(action.payload.userId)) {
							return photo.likes.push(action.payload.userId);
						} else {
							let index = photo.likes.indexOf(action.payload.userId);
							photo.likes.splice(index, 1);
						}
					}
					return photo;
				});

				state.message = action.payload.message;
			})
			.addCase(likePhoto.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(commentPhoto.fulfilled, (state, action) => {
				state.loading = false;
				state.error = null;
				state.success = true;
				state.photo.comments.push(action.payload.comment);
				state.message = action.payload.message;
			})
			.addCase(commentPhoto.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(getPhotos.pending, (state) => {
				state.loading = true;
				state.error = false;
			})
			.addCase(getPhotos.fulfilled, (state, action) => {
				state.loading = false;
				state.error = null;
				state.success = true;
				state.photos = action.payload;
			})
			.addCase(deleteComment.pending, (state) => {
				state.loading = false;
				state.error = false;
			})
			.addCase(deleteComment.fulfilled, (state, action) => {
				state.loading = false;
				state.error = null;
				state.success = true;

				if (state.photo.comments) {
					let index = state.photo.comments.indexOf(action.payload._id);
					state.photo.comments.splice(index, 1);
				}
				state.message = action.payload.message;
			})
			.addCase(deleteComment.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
				state.photo = {};
			});
	},
});

export const { resetMessage } = photoSlice.actions;
export default photoSlice.reducer;
