import { api, requestConfig } from "../utils/config";

// Publish an user photo
const publishPhoto = async (data, token) => {
	const config = requestConfig("POST", data, token, true);

	try {
		const res = await fetch(api + "/photos", config)
			.then((res) => res.json())
			.catch((err) => err);

		return res;
	} catch (error) {
		console.log(error);
	}
};

// Get User all photos
const getUserPhotos = async (id) => {
	const config = requestConfig("GET");

	try {
		const res = await fetch(api + `/photos/user/${id}`, config)
			.then((res) => res.json())
			.catch((err) => err);

		return res;
	} catch (error) {
		console.log(error);
	}
};

// Delete a photo
const deletePhoto = async (id, token) => {
	const config = requestConfig("DELETE", null, token);

	try {
		const res = await fetch(api + `/photos/${id}`, config)
			.then((res) => res.json())
			.catch((err) => err);

		return res;
	} catch (error) {
		console.log(error);
	}
};

// Update a photo
const updatePhoto = async (data, id, token) => {
	const config = requestConfig("PUT", data, token);

	try {
		const res = await fetch(api + `/photos/${id}`, config)
			.then((res) => res.json())
			.catch((err) => err);

		return res;
	} catch (error) {
		console.log(error);
	}
};

// Get a photo by id
const getPhoto = async (id) => {
	const config = requestConfig("GET");

	try {
		const res = await fetch(api + `/photos/${id}`, config)
			.then((res) => res.json())
			.catch((err) => err);

		return res;
	} catch (error) {
		console.log(error);
	}
};

const likePhoto = async (id, token) => {
	const config = requestConfig("PUT", null, token);

	try {
		const res = await fetch(api + `/photos/like/` + id, config)
			.then((res) => res.json())
			.catch((err) => err);

		return res;
	} catch (error) {
		console.log(error);
	}
};

// Add comment
const commentPhoto = async (data, id, token) => {
	const config = requestConfig("PUT", data, token);

	try {
		const res = await fetch(api + `/photos/comment/` + id, config)
			.then((res) => res.json())
			.catch((err) => err);

		return res;
	} catch (error) {
		console.log(error);
	}
};

// Get All photos
const getPhotos = async () => {
	const config = requestConfig("GET");

	try {
		const res = await fetch(api + `/photos/`, config)
			.then((res) => res.json())
			.catch((err) => err);

		return res;
	} catch (error) {
		console.log(error);
	}
};

// Delete a Comment
const deleteComment = async (id, token) => {
	const config = requestConfig("DELETE", null, token);

	try {
		const res = await fetch(api + `/photos/comment/${id}`, config)
			.then((res) => res.json())
			.catch((err) => err);

		return res;
	} catch (error) {
		console.log(error);
	}
};

const photoService = {
	publishPhoto,
	getUserPhotos,
	deletePhoto,
	updatePhoto,
	getPhoto,
	likePhoto,
	commentPhoto,
	getPhotos,
	deleteComment,
};
export default photoService;
