import "./PhotoItem.css";
import { useEffect } from "react";

import { uploads } from "../../utils/config";

import { Link } from "react-router-dom";
import { BsFillEyeFill } from "react-icons/bs";

import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../../slices/userSlice";

const PhotoItem = ({ photo, view = false }) => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getUserDetails(photo.userId));
	}, [dispatch, photo]);

	const { user } = useSelector((state) => state.user);

	return (
		<div id="photo-item">
			{user && (
				<div>
					<Link className="profile-header-photo" to={`/users/${photo.userId}`}>
						{photo.profileImage && (
							<img
								className="profile-pic-post"
								src={`${uploads}/users/${photo.profileImage}`}
								alt={photo.userName}
							/>
						)}
						<h2>{photo.userName}</h2>
					</Link>
				</div>
			)}
			{photo.image && view === false && (
				<img
					className="pic-item"
					src={`${uploads}/photos/${photo.image}`}
					alt={photo.image}
				/>
			)}
			{photo.image && view === true && (
				<Link className="photo-img" to={`/photos/${photo._id}`}>
					<div>
						<img
							className="pic-item-view"
							src={`${uploads}/photos/${photo.image}`}
							alt={photo.title}
						/>
						<div className="eye-icon NonOpaque">
							<BsFillEyeFill size="1.5em" />
						</div>
					</div>
				</Link>
			)}
			<h2>{photo.title}</h2>
		</div>
	);
};

export default PhotoItem;
