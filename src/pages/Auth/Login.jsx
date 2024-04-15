import "./Auth.css";

// Components
import { Link } from "react-router-dom";
import Message from "../../components/Message/Message";

// Hooks
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// Redux
import { login, reset } from "../../slices/authSlice";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const dispatch = useDispatch();

	const { loading, error } = useSelector((state) => state.auth);

	const handleSubmit = (e) => {
		e.preventDefault();

		const user = {
			email,
			password,
		};

		dispatch(login(user));
	};

	useEffect(() => {
		dispatch(reset());
	}, [dispatch]);

	return (
		<div id="login">
			<h2>HubGram</h2>
			<p className="subtitle">Login to see what's new.</p>
			<form onSubmit={handleSubmit}>
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
				{!loading && <input type="submit" value="Sign in" />}
				{loading && <input type="submit" disabled value="Wait..." />}
				{error && console.log(error)}
				{error && <Message msg={error.msg || error} type="error" />}
			</form>
			<p>
				Don't have an account yet? <Link to="/register">Click here.</Link>
			</p>
		</div>
	);
};

export default Login;
