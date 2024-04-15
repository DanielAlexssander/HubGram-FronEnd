import "./LikeContainer.css";

import { BsHeart, BsHeartFill } from "react-icons/bs";

import { Link } from "react-router-dom";

const LikeContainer = ({ photo, user, handleLike }) => {
	return (
		<div className="like-container">
			{photo.likes && user && (
				<>
					{photo.likes.includes(user._id) ? (
						<BsHeartFill onClick={() => handleLike(photo)} />
					) : (
						<BsHeart onClick={() => handleLike(photo)} />
					)}
					<p>{photo.likes.length} like(s)</p>
				</>
			)}
			{photo.likes && !user && (
				<>
					<Link to="/login">
						<BsHeart />
					</Link>
					<p>{photo.likes.length} like(s)</p>
				</>
			)}
		</div>
	);
};

export default LikeContainer;
