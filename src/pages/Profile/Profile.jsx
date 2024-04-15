import "./Profile.css";

import { uploads } from "../../utils/config";

// Components
import { Link } from "react-router-dom";
import Message from "../../components/Message/Message";
import { BsFillEyeFill, BsPencilFill, BsXLg } from "react-icons/bs";
import Loading from "../../components/Loading/Loading";

// Hooks
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

// Redux
import { getUserDetails } from "../../slices/userSlice";
import {
	publishPhoto,
	resetMessage,
	getUserPhotos,
	deletePhoto,
	updatePhoto,
} from "../../slices/photoSlice";

const Profile = () => {
	const { id } = useParams();

	const dispatch = useDispatch();
	dispatch(resetMessage());

	const { user, loading } = useSelector((state) => state.user);
	const { user: userAuth } = useSelector((state) => state.auth);
	const {
		photos,
		// loading: loadingPhoto,
		message: messagePhoto,
		error: errorPhoto,
	} = useSelector((state) => state.photo);

	const [title, setTitle] = useState("");
	const [image, setImage] = useState("");

	const [editTitle, setEditTitle] = useState("");
	const [editId, setEditId] = useState("");
	const [editImage, setEditImage] = useState("");

	const inputImage = useRef();

	// New form and edit form refs
	const newPhotoForm = useRef();
	const editPhotoForm = useRef();

	// Load user data
	useEffect(() => {
		dispatch(getUserDetails(id));
		dispatch(getUserPhotos(id));
	}, [dispatch, id]);

	if (loading) {
		return <Loading />;
	}

	const handleFile = (e) => {
		const image = e.target.files[0];

		setImage(image);
	};

	const resetComponentMessage = () => {
		setTimeout(() => {
			dispatch(resetMessage());
		}, 2000);
	};

	// Post photo
	const handleSubmit = async (e) => {
		e.preventDefault();

		const photoData = {
			title,
			image,
		};

		// Build form data
		const formData = new FormData();

		const photoFormData = Object.keys(photoData).forEach((key) =>
			formData.append(key, photoData[key])
		);

		formData.append("photo", photoFormData);

		await dispatch(publishPhoto(formData));

		if (errorPhoto) {
			return;
		}

		setTitle("");
		inputImage.current.value = null;

		resetComponentMessage();
	};

	// Delete a photo
	const handleDelete = (id) => {
		dispatch(deletePhoto(id));

		resetComponentMessage();
	};

	// Show or hide Forms
	const hideOrShowForms = () => {
		newPhotoForm.current.classList.toggle("hide");
		editPhotoForm.current.classList.toggle("hide");
	};

	// Update a photo
	const handleEdit = (photo) => {
		if (editPhotoForm.current.classList.contains("hide")) {
			hideOrShowForms();
		}

		setEditId(photo._id);
		setEditTitle(photo.title);
		setEditImage(photo.image);
	};

	const handleUpdate = (e) => {
		e.preventDefault();

		const photoData = {
			title: editTitle,
			_id: editId,
		};

		dispatch(updatePhoto(photoData));

		resetComponentMessage();
		hideOrShowForms();
	};

	const handleCancelEdit = (e) => {
		e.preventDefault();

		hideOrShowForms();
	};

	return (
		<div id="profile">
			<div className="profile-header">
				{user.profileImage && (
					<img src={`${uploads}/users/${user.profileImage}`} alt={user.name} />
				)}
				<div className="profile-description">
					<h2>{user.name}</h2>
					<p>{user.bio}</p>
				</div>
			</div>
			{userAuth && id === userAuth._id && (
				<>
					<div className="new-photo" ref={newPhotoForm}>
						<h3>Share a moment of yours:</h3>
						<form onSubmit={handleSubmit}>
							<label>
								<span>Title for photo:</span>
								<input
									type="text"
									placeholder="Type your title"
									onChange={(e) => setTitle(e.target.value)}
									value={title || ""}
								/>
							</label>
							<label>
								<span>Image:</span>
								<input
									type="file"
									onChange={handleFile}
									ref={inputImage}
									accept="image/png, image/jpeg"
								/>
							</label>
							{!loading && <input type="submit" value="Post" />}
							{loading && <input type="submit" disabled value="Wait..." />}
							{errorPhoto && (
								<Message msg={errorPhoto.msg || errorPhoto} type="error" />
							)}
							{messagePhoto && <Message msg={messagePhoto} type="success" />}
						</form>
					</div>
					<div className="edit-photo hide" ref={editPhotoForm}>
						<h3>Editing:</h3>
						{editImage && (
							<div className="container-editImage">
								<img src={`${uploads}/photos/${editImage}`} alt={editTitle} />
							</div>
						)}
						<form onSubmit={handleUpdate}>
							<label>
								<span>New title:</span>
								<input
									type="text"
									placeholder="Type your new title"
									onChange={(e) => setEditTitle(e.target.value)}
									value={editTitle || ""}
								/>
							</label>
							<div className="btn-editForm">
								<input type="submit" value="Edit" />
								<button className="cancel-btn" onClick={handleCancelEdit}>
									Cancel edit
								</button>
							</div>
							{errorPhoto && (
								<Message msg={errorPhoto.msg || errorPhoto} type="error" />
							)}
							{messagePhoto && <Message msg={messagePhoto} type="success" />}
						</form>
					</div>
				</>
			)}
			{photos && photos.length > 0 && (
				<div className="user-photos">
					<h2>Photos published:</h2>
					<div className="photos-container">
						{photos.map((photo) => (
							<div className="photo" key={photo._id}>
								{photo.image && (
									<Link className="photo-img" to={`/photos/${photo._id}`}>
										<div>
											<img
												src={`${uploads}/photos/${photo.image}`}
												alt={photo.title}
											/>
											<div className="eye-icon NonOpaque">
												<BsFillEyeFill size="1.5em" />
											</div>
										</div>
									</Link>
								)}
								{userAuth && id === userAuth._id ? (
									<div className="actions">
										<BsPencilFill onClick={() => handleEdit(photo)} />
										<BsXLg
											onClick={() => {
												handleDelete(photo._id);
											}}
										/>
									</div>
								) : (
									<></>
								)}
							</div>
						))}
					</div>
				</div>
			)}
			{photos.length === 0 && (
				<p className="no-photos">No photos published yet.</p>
			)}
		</div>
	);
};

export default Profile;
