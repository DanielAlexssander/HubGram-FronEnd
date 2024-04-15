import React from "react";
import "./Loading.css";

const Loading = () => {
	return (
		<div id="loading-content">
			<div className="loading-wave">
				<div className="loading-bar"></div>
				<div className="loading-bar"></div>
				<div className="loading-bar"></div>
				<div className="loading-bar"></div>
			</div>
		</div>
	);
};

export default Loading;
