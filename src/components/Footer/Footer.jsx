import React from "react";
import "./Footer.css";

import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<div id="footer">
			<p>HubGram &copy; 2024</p>
			<p>
				Created by{" "}
				<Link
					to="https://danielalexssander.github.io/Portfolio/"
					target="_blank"
				>
					Daniel Alexssander
				</Link>
			</p>
		</div>
	);
};

export default Footer;
