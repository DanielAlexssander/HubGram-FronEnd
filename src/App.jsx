import "./App.css";

// Router
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

// Hooks
import { useAuth } from "./hooks/useAuth";

// Components
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import Loading from "./components/Loading/Loading";

// Pages
import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import EditProfile from "./pages/EditProfile/EditProfile";
import Profile from "./pages/Profile/Profile";
import Photo from "./pages/Photo/Photo";

function App() {
	const { auth, loading } = useAuth();

	if (loading) {
		return <Loading />;
	}

	return (
		<div className="App">
			<BrowserRouter>
				<NavBar />
				<div className="container">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/users/:id" element={<Profile />} />
						<Route path="/photos/:id" element={<Photo />} />
						<Route
							path="/profile"
							element={auth ? <EditProfile /> : <Navigate to="/login" />}
						/>
						<Route
							path="/login"
							element={!auth ? <Login /> : <Navigate to="/" />}
						/>
						<Route
							path="/register"
							element={!auth ? <Register /> : <Navigate to="/" />}
						/>
					</Routes>
				</div>
				<Footer />
			</BrowserRouter>
		</div>
	);
}

export default App;
