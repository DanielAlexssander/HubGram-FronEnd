import "./Auth.css";

// Components
import { Link } from "react-router-dom";
import Message from "../../components/Message/Message";

// Hooks
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// Redux
import { register, reset } from "../../slices/authSlice";

const Register = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const dispatch = useDispatch();

	const { loading, error } = useSelector((state) => state.auth);

	const handleSubmit = (e) => {
		e.preventDefault();

		const user = {
			name,
			email,
			password,
			confirmPassword,
		};

		dispatch(register(user));
	};

	// Clean all auth states
	useEffect(() => {
		dispatch(reset());
	}, [dispatch]);

	return (
		<div id="register">
			<h2>HubGram</h2>
			<p className="subtitle">Register to see your friends' photos.</p>
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
					onChange={(e) => setEmail(e.target.value)}
					value={email || ""}
				/>
				<input
					type="password"
					placeholder="Password"
					onChange={(e) => setPassword(e.target.value)}
					value={password || ""}
				/>
				<input
					type="password"
					placeholder="Confirm Password"
					onChange={(e) => setConfirmPassword(e.target.value)}
					value={confirmPassword || ""}
				/>
				{!loading && <input type="submit" value="Register" />}
				{loading && <input type="submit" disabled value="Wait..." />}
				{error && console.log(error)}
				{error && <Message msg={error.msg || error} type="error" />}
			</form>
			<p>
				Already have an account? <Link to="/login">Click here.</Link>
			</p>
		</div>
	);
};

export default Register;
