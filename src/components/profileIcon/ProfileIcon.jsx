import {
	Avatar,
	Button,
	Center,
	Image,
	Menu,
	MenuButton,
	MenuDivider,
	MenuGroup,
	MenuItem,
	MenuList,
} from "@chakra-ui/react";
import React from "react";
import { SlLogout } from "react-icons/sl";
import { useNavigate } from "react-router-dom";

function ProfileIcon() {
	const navigate = useNavigate();

	const handleLogout = () => {
		navigate("/login");
	};
	const handleProfile = () => {
		navigate("/profile");
	};

	return (
		<Menu isLazy={true}>
			<MenuButton
				as={Button}
				height={"100%"}
				width={"100%"}
				padding={"1%"}
				borderRadius={"50%"}
				bgColor={"black"}
			>
				<Avatar bg="teal.500" />
			</MenuButton>
			<MenuList back>
				<MenuGroup title="Profile">
					<MenuItem onClick={handleProfile}>My Account</MenuItem>
					<MenuItem icon={<SlLogout />} onClick={handleLogout}>
						Logout
					</MenuItem>
				</MenuGroup>
				<MenuDivider />
			</MenuList>
		</Menu>
	);
}

export default ProfileIcon;
