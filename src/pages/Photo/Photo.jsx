import "./Photo.css";

import { uploads } from "../../utils/config";

// Components
import Message from "../../components/Message/Message";
import { Link } from "react-router-dom";
import PhotoItem from "../../components/PhotoItem/PhotoItem";

// Hooks
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useResetComponentMessage } from "../../hooks/useResetComponentMessage";

// Redux
import {
	getPhoto,
	likePhoto,
	commentPhoto,
	deleteComment,
} from "../../slices/photoSlice";
import Loading from "../../components/Loading/Loading";
import LikeContainer from "../../components/LikeContainer/LikeContainer";
import { BsTrashFill } from "react-icons/bs";

const Photo = () => {
	const { id } = useParams();

	const dispatch = useDispatch();

	const resetMessage = useResetComponentMessage(dispatch);

	const { user } = useSelector((state) => state.auth);

	const { photo, loading, error, message } = useSelector(
		(state) => state.photo
	);

	// Comments
	const [commentText, setCommentText] = useState("");

	const handleComment = (e) => {
		e.preventDefault();

		if (commentText === "") {
			return;
		}

		const commentData = {
			comment: commentText,
			id: photo._id,
		};

		dispatch(commentPhoto(commentData));

		setCommentText("");

		resetMessage();
	};

	// Load photo data
	useEffect(() => {
		dispatch(getPhoto(id));
	}, [dispatch, id]);

	const handleLike = (photo) => {
		dispatch(likePhoto(photo._id));

		resetMessage();
	};

	if (loading) {
		return <Loading />;
	}

	return (
		<div id="photo">
			<PhotoItem photo={photo} />
			<LikeContainer photo={photo} user={user} handleLike={handleLike} />
			<div className="message-container">
				{error && <Message msg={error.msg || error} type="error" />}
				{message && <Message msg={message.msg || message} type="success" />}
			</div>
			<div className="comments">
				{photo.comments && (
					<>
						<h3>Comments: ({photo.comments && photo.comments.length})</h3>
						<form onSubmit={handleComment}>
							<input
								type="text"
								placeholder="Type a comment"
								onChange={(e) => setCommentText(e.target.value)}
								value={commentText || ""}
							/>
							{!loading && <input type="submit" value="Send" />}
							{loading && <input type="submit" disabled value="Wait..." />}
						</form>
						{photo.comments.length === 0 && (
							<p className="subtitle no-comment">No comments yet...</p>
						)}
						{photo.comments.map((comment) => (
							<div className="comment" key={comment.comment}>
								<div className="author">
									{comment.userImage && (
										<img
											src={`${uploads}/users/${comment.userImage}`}
											alt={comment.userName}
										/>
									)}
									<Link to={`/users/${comment.userId}`}>
										<p>{comment.userName}</p>
									</Link>
								</div>
								<p>{comment.comment}</p>
								{comment.userId === user._id && (
									<div className="delete-comment">
										<BsTrashFill
											size={`1.1em`}
											color="red"
											onClick={() => {
												dispatch(deleteComment(comment._id));
												resetMessage();
											}}
										/>
									</div>
								)}
							</div>
						))}
					</>
				)}
			</div>
		</div>
	);
};

export default Photo;
