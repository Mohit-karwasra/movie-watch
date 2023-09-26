import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import jwtDecode from "jwt-decode";

export const Protected = (props) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const navigate = useNavigate();
	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("user"));
		if (!user || !user.token) {
			setIsLoggedIn(false);
			navigate("/login");
		} else {
			const decodeToken = jwtDecode(user.token);
			const currTime = Date.now() / 1000;
			if (decodeToken.exp < currTime) {
				setIsLoggedIn(false);
				navigate("/login");
			} else {
				setIsLoggedIn(true);
			}
		}
	}, [navigate]);
	return <>{isLoggedIn ? props.children : null}</>;
};

Protected.propTypes = {
	children: PropTypes.node,
};
