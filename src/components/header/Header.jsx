import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";

import "./style.scss";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/cdnlogo.com_zee5.svg";
import { Img } from "@chakra-ui/react";
import avatar from "../../assets/avatar.png";
import ProfileIcon from "../profileIcon/ProfileIcon";

const Header = () => {
	const [show, setShow] = useState("top");
	const [lastScrollY, setLastScrollY] = useState(0);
	const [mobileMenu, setMobileMenu] = useState(false);
	const [query, setQuery] = useState("");
	const [showSearch, setShowSearch] = useState("");
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location]);

	const controlNavbar = () => {
		if (window.scrollY > 200) {
			if (window.scrollY > lastScrollY && !mobileMenu) {
				setShow("hide");
			} else {
				setShow("show");
			}
		} else {
			setShow("top");
		}
		setLastScrollY(window.scrollY);
	};

	useEffect(() => {
		window.addEventListener("scroll", controlNavbar);
		return () => {
			window.removeEventListener("scroll", controlNavbar);
		};
	}, [lastScrollY]);

	const searchQueryHandler = (event) => {
		if (event.key === "Enter" && query.length > 0) {
			navigate(`/search/${query}`);
			setTimeout(() => {
				setShowSearch(false);
			}, 1000);
		}
	};

	const openSearch = () => {
		setMobileMenu(false);
		setShowSearch(true);
	};

	const openMobileMenu = () => {
		setMobileMenu(true);
		setShowSearch(false);
	};

	const navigationHandler = (type) => {
		if (type === "movie") {
			navigate("/explore/movie");
		} else if (type === "watchlist") {
			navigate("/watchlist");
		} else {
			navigate("/explore/tv");
		}
		setMobileMenu(false);
	};

	return (
		<header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
			<ContentWrapper>
				<div className="logo-menu-container">
					<div className="logo" onClick={() => navigate("/")}>
						<img src={logo} alt="logo" />
					</div>
					<div>
						<ul className="menuItems">
							{mobileMenu && (
								<li className="menuItem">
									<div style={{ color: "black" }}>
										<ProfileIcon />
									</div>
								</li>
							)}
							<li className="menuItem" onClick={() => navigate("/")}>
								Home
							</li>
							<li className="menuItem" onClick={() => navigationHandler("movie")}>
								Movies
							</li>
							<li className="menuItem" onClick={() => navigationHandler("tv")}>
								TV Shows
							</li>
							<li className="menuItem" onClick={() => navigationHandler("watchlist")}>
								Watchlist
							</li>

							{mobileMenu && <li className="menuItem">dummy item</li>}
						</ul>
					</div>
				</div>

				<div className="searchBar">
					<ContentWrapper>
						<HiOutlineSearch className="searchIcon" onClick={openSearch} />
						<div className="searchInput">
							<input
								type="text"
								placeholder="Search for a movie or tv show...."
								onChange={(e) => setQuery(e.target.value)}
								onKeyUp={searchQueryHandler}
							/>
							{/* <VscChromeClose onClick={() => setShowSearch(false)} /> */}
						</div>
					</ContentWrapper>
				</div>

				<div className="profile-search-container">
					{/* I'm using tabindex and the :focus state to cheat the interactivity on mobile */}
					<div className="container__search" tabIndex="1">
						<div className="search-container" tabIndex="1">
							<input
								className="search-input"
								type="text"
								placeholder="search"
								// placeholder="Search for a movie or tv show...."
								onChange={(e) => setQuery(e.target.value)}
								onKeyUp={searchQueryHandler}
							/>
							<a className="search-button">
								<i className="fa fa-search">
									<HiOutlineSearch className="searchIcon" />
								</i>
							</a>
						</div>
					</div>
					<div className="profileIcon-header">
						<ProfileIcon />
					</div>
				</div>

				<div className="mobileMenuItems">
					{/* <HiOutlineSearch onClick={openSearch} /> */}
					{mobileMenu ? (
						<VscChromeClose onClick={() => setMobileMenu(false)} />
					) : (
						<SlMenu onClick={openMobileMenu} />
					)}
				</div>
			</ContentWrapper>
		</header>
	);
};

export default Header;
