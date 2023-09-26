import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import "./style.scss";
import { Avatar, useToast } from "@chakra-ui/react";
import axios from "axios";

function Profile() {
	const [activeTab, setActiveTab] = useState("MyProfile");

	const [userData, setUserData] = useState(null);

	const [oldPassword, setOldPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");

	const toast = useToast();

	useEffect(() => {
		// Retrieve data from local storage
		const storedData = localStorage.getItem("user");

		if (storedData) {
			const userData = JSON.parse(storedData);
			setUserData(userData.data);
		}
	}, []);

	const handlePasswordChange = async () => {
		const BASE_URL = "https://academics.newtonschool.co/api/v1";
		const headers = { projectId: import.meta.env.VITE_NEWTON_PROJECT_ID }; // Replace 'Your projectId' with the actual project ID

		try {
			const updatePassword_url = `${BASE_URL}/user/updateMyPassword`;

			// Request body as per the example
			const requestBody = {
				name: userData.name,
				email: userData.email,
				passwordCurrent: oldPassword,
				password: newPassword,
				appType: "ott",
			};

			// Send the PATCH request
			const response = await axios.patch(updatePassword_url, requestBody, { headers });

			// Check the response and handle accordingly
			if (response.data.status === "success") {
				// Password updated successfully
				toast({
					title: "Success",
					description: "Password Updated",
					status: "success",
					duration: 2000,
					isClosable: true,
				});
				// Redirect to the desired page upon successful password change
				// You need to import 'navigate' from your router library to use this
				// navigate("/login");
			} else {
				// Display an error toast message
				toast({
					title: "Update Failed",
					description: "Password not updated",
					status: "error",
					duration: 3000,
					isClosable: true,
				});
			}
		} catch (error) {
			console.error("Password update error: ", error);
			// Handle any errors that occurred during the API call
			toast({
				title: "Error occurred",
				description: error.message,
				status: "error",
				duration: 4000,
				isClosable: true,
			});
		}
	};

	const handleTabClick = (tab) => {
		setActiveTab(tab);
	};
	return (
		<div className="container">
			<Header />

			<section id="userProfileSection">
				<div id="MainDivProfileContainer">
					<div id="firstDivProfileContainer">
						<button
							onClick={() => handleTabClick("MyProfile")}
							className={activeTab === "MyProfile" ? "active" : ""}
						>
							My Profile
						</button>
						<button
							onClick={() => handleTabClick("ChangePassword")}
							className={activeTab === "ChangePassword" ? "active" : ""}
						>
							Change Password
						</button>

						<button
							onClick={() => handleTabClick("Subscriptions")}
							className={activeTab === "Subscriptions" ? "active" : ""}
						>
							Subscriptions
						</button>
						<button
							onClick={() => handleTabClick("Rentals")}
							className={activeTab === "Rentals" ? "active" : ""}
						>
							Rentals
						</button>
						<button
							onClick={() => handleTabClick("Transactions")}
							className={activeTab === "Transactions" ? "active" : ""}
						>
							Transactions
						</button>
					</div>

					<div id="secondDivProfileContainer">
						{activeTab === "MyProfile" && (
							<section id="userProfileSectionUnder">
								<div>
									<h1 style={{ fontSize: "3rem" }}>My Profile</h1>
									<div>
										<div style={{ display: "flex", gap: "2rem" }}>
											<Avatar bg={"red.200"} />
											<div>
												<h1>{userData?.name} </h1>
												<p>{userData?.email}</p>
											</div>
										</div>
									</div>
								</div>
							</section>
						)}

						{activeTab === "ChangePassword" && (
							<section id="changePassword">
								<h1 style={{ fontSize: "3rem" }}>Change Password</h1>
								{/* Change password form goes here */}
								<div className="fieldPassWordChange" style={{ color: "black" }}>
									{/* Password change input fields */}
									<input
										onChange={(e) => setOldPassword(e.target.value)}
										value={oldPassword}
										type="text"
										placeholder="Old Password"
									/>
									<input
										value={newPassword}
										onChange={(e) => setNewPassword(e.target.value)}
										type="text"
										placeholder="New Password"
									/>
								</div>
								<button id="changeItPass" onClick={handlePasswordChange}>
									Change Password
								</button>
							</section>
						)}

						{activeTab === "Subscriptions" && (
							<section id="userSubscription">
								<h1 style={{ fontSize: "3rem" }}>My Subscriptions</h1>
								{/* Subscription content goes here */}
								<p>Soon to be added</p>
							</section>
						)}

						{activeTab === "Rentals" && (
							<section id="userRentals">
								<h1 style={{ fontSize: "3rem" }}>My Rentals</h1>
								{/* Rentals content goes here */}
								<p>Soon to be added</p>
							</section>
						)}

						{activeTab === "Transactions" && (
							<section id="userTransactions">
								<h1 style={{ fontSize: "3rem" }}>My Transactions</h1>
								{/* Transactions content goes here */}
								<p>Soon to be added</p>
							</section>
						)}
					</div>
				</div>
			</section>

			{/* <section id="footer_top">Footer content goes here</section> */}
		</div>
	);
}

export default Profile;
