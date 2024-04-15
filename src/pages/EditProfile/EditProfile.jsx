import "./EditProfile.css";

import { uploads } from "../../utils/config";

// Hooks
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// Redux
import { profile, resetMessage, updateProfile } from "../../slices/userSlice";

// Components
import Message from "../../components/Message/Message";
import Loading from "../../components/Loading/Loading";

const EditProfile = () => {
	const dispatch = useDispatch();

	const { user, message, error, loading } = useSelector((state) => state.user);

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [bio, setBio] = useState("");
	const [profileImage, setProfileImage] = useState("");
	const [previewImage, setPreviewImage] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const [errorPass, setErrorPass] = useState("");

	// Fill states
	useEffect(() => {
		if (user) {
			setName(user.name);
			setEmail(user.email);
			setBio(user.bio);
			// setImage(user.image);
		}
	}, [user]);

	// Load user data
	useEffect(() => {
		dispatch(profile());
	}, [dispatch]);

	const handleFile = (e) => {
		const image = e.target.files[0];

		console.log(image);

		setPreviewImage(image);

		setProfileImage(image);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Gather user data from states
		const userData = {
			name,
		};

		if (profileImage) {
			userData.profileImage = profileImage;
		}

		if (bio) {
			userData.bio = bio;
		}

		if (password && confirmPassword === password) {
			userData.password = password;
		} else if (password) {
			setErrorPass("The passwords do not match.");
			setTimeout(() => {
				setErrorPass("");
			}, 2000);
			return;
		}

		// build form data
		const formData = new FormData();

		const userFormData = Object.keys(userData).forEach((key) =>
			formData.append(key, userData[key])
		);

		formData.append("user", userFormData);

		await dispatch(updateProfile(formData));

		setTimeout(() => {
			dispatch(resetMessage());

			setPassword("");
			setConfirmPassword("");
		}, 2000);
	};

	if (loading) {
		return <Loading />;
	}

	return (
		<div id="edit-profile">
			<h2>Edit your profile</h2>
			<p className="subtitle">
				Add a profile picture and tell us more about yourself.
			</p>
			{/* Preview of image */}
			{(user.profileImage || previewImage) && (
				<img
					className="profile-image"
					src={
						previewImage
							? URL.createObjectURL(previewImage)
							: `${uploads}/users/${user.profileImage}`
					}
					alt={user.name}
				/>
			)}
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="Name"
					onChange={(e) => setName(e.target.value)}
					value={name || ""}
				/>
				<input
					type="email"
					placeholder="E-mail"
					disabled
					onChange={(e) => setEmail(e.target.value)}
					value={email || ""}
				/>
				<label>
					<span>Profile picture:</span>
					<input
						type="file"
						accept="image/png, image/jpeg"
						onChange={handleFile}
					/>
				</label>
				<label>
					<span>Bio:</span>
					<input
						type="text"
						placeholder="Profile description"
						onChange={(e) => setBio(e.target.value)}
						value={bio || ""}
					/>
				</label>
				<label>
					<span>Change your password:</span>
					<input
						type="password"
						placeholder="Type your new password"
						onChange={(e) => setPassword(e.target.value)}
						value={password || ""}
					/>
					<input
						type="password"
						placeholder="Confirm your new password"
						onChange={(e) => setConfirmPassword(e.target.value)}
						value={confirmPassword || ""}
					/>
				</label>
				{!loading && <input type="submit" value="Update" />}
				{loading && <input type="submit" disabled value="Wait..." />}
				{error && console.log(error)}
				{error || errorPass ? (
					<Message msg={error || errorPass} type="error" />
				) : (
					<></>
				)}
				{message && <Message msg={message} type="success" />}
			</form>
		</div>
	);
};

export default EditProfile;
