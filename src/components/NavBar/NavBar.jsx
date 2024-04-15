import React, { useEffect, useState } from "react";
import "./NavBar.css";

// Components
import { NavLink, Link } from "react-router-dom";
import {
	BsSearch,
	BsHouseDoorFill,
	BsFillPersonFill,
	BsFillCameraFill,
} from "react-icons/bs";

import { IoIosLogOut } from "react-icons/io";

// Hooks
import { useAuth } from "../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";

// Redux
import { logout, reset } from "../../slices/authSlice";
import { searchUsers } from "../../slices/userSlice";
import { uploads } from "../../utils/config";

const NavBar = () => {
	const { auth } = useAuth();
	const { user } = useSelector((state) => state.auth);

	const dispatch = useDispatch();

	const handleLogout = () => {
		dispatch(logout());
		dispatch(reset());
	};

	const [searchUser, setSearchUser] = useState("");
	const { users } = useSelector((state) => state.user);

	useEffect(() => {
		if (searchUser !== "") {
			dispatch(searchUsers(searchUser));
		}
	}, [dispatch, searchUser]);

	const handleSearch = (e) => {
		e.preventDefault();
	};

	return (
		<nav id="nav-bar">
			<Link id="logo-nav" to="/">
				Hub<span>GRAM</span>
			</Link>
			<form id="search-form" onSubmit={handleSearch}>
				<BsSearch className="svg-search" />
				<input
					type="text"
					placeholder="Search"
					onChange={(e) => setSearchUser(e.target.value)}
					value={searchUser || ""}
				/>
				{users && searchUser !== "" && (
					<div id="search-fild">
						{console.log(users)}
						{users.length === 0 && <p>User not found.</p>}
						{users.map((user) => (
							<div className="user" key={user._id}>
								<Link
									to={`/users/${user._id}`}
									onClick={() => setSearchUser("")}
								>
									{user.profileImage ? (
										<img src={`${uploads}/users/${user.profileImage}`} alt="" />
									) : (
										<BsFillPersonFill color="grey" />
									)}
									<span>{user.name}</span>
								</Link>
							</div>
						))}
					</div>
				)}
			</form>
			<ul id="nav-links">
				<li>
					<NavLink to="/">
						<BsHouseDoorFill />
					</NavLink>
				</li>
				{auth ? (
					<>
						{user && (
							<li>
								<NavLink to={`/users/${user._id}`}>
									<BsFillCameraFill />
								</NavLink>
							</li>
						)}
						<li>
							<NavLink to={`/profile/`}>
								<BsFillPersonFill />
							</NavLink>
						</li>
						<li id="logout">
							<span onClick={handleLogout}>
								<IoIosLogOut />
							</span>
						</li>
					</>
				) : (
					<>
						<li>
							<NavLink to="/login">Login</NavLink>
						</li>
						<li>
							<NavLink to="/register">Register</NavLink>
						</li>
					</>
				)}
			</ul>
		</nav>
	);
};

export default NavBar;
