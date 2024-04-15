import "./Home.css";

// Components
import LikeContainer from "../../components/LikeContainer/LikeContainer";
import PhotoItem from "../../components/PhotoItem/PhotoItem";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading/Loading";

// Hooks
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useResetComponentMessage } from "../../hooks/useResetComponentMessage";

// Redux
import { getPhotos, likePhoto } from "../../slices/photoSlice";

const Home = () => {
	const dispatch = useDispatch();

	const resetMessage = useResetComponentMessage(dispatch);

	const { user } = useSelector((state) => state.auth);
	const { photos, loading } = useSelector((state) => state.photo);

	useEffect(() => {
		dispatch(getPhotos());
	}, [dispatch]);

	// Like a photo
	const handleLike = (photo) => {
		dispatch(likePhoto(photo._id));

		resetMessage();
	};

	if (loading) {
		return <Loading />;
	}

	return (
		<div id="home">
			{photos &&
				photos.map((photo) => (
					<div className="photo-home" key={photo._id}>
						<PhotoItem photo={photo} view={true} />
						<LikeContainer photo={photo} user={user} handleLike={handleLike} />
					</div>
				))}
			{photos && photos.length === 0 && (
				<h2 className="no-photos">
					No photos have been published yet.{" "}
					{user && <Link to={`/users/${user._id}`}>Click here</Link>}
					{!user && <Link to={`/login`}>Click here</Link>}
				</h2>
			)}
		</div>
	);
};

export default Home;
