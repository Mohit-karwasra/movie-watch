import React, { useEffect, useState } from "react";
import style from "./style.module.scss";
import {
	Box,
	Spinner,
	useToast,
	Text,
	Heading,
	Flex,
	Link,
	Image,
	Input,
	InputGroup,
	InputRightElement,
	Button,
	Icon,
} from "@chakra-ui/react";
import { ChevronUpIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

import github from "../../../assets/github-142-svgrepo-com.svg";
import google from "../../../assets/google-color-svgrepo-com.svg";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwtDecode from "jwt-decode";

let obj = { data: "" };

const auth = "login";

let loginButtonStyleAllow = {
	cursor: "pointer",
	opacity: "1",
	fontWeight: "700",
	letterSpacing: "0.04rem",
	color: "#FFFFFF",
};
let loginButtonStyleDontAllow = {
	cursor: "not-allowed",
	opacity: "0.5",
	fontWeight: "700",
	letterSpacing: "0.04rem",
	color: "#FFFFFF80",
};

const Login = () => {
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [isbtndisabled, setisbtndisabled] = useState(true);
	const [loading, setLoading] = useState(false);
	const [isValidEmail, setIsValidEmail] = useState(true); // Track valid email
	const [showPassword, setShowPassword] = useState(false);

	const navigate = useNavigate();
	const toast = useToast();

	useEffect(() => {
		document.title = "Ze5 | Login";
	}, []);

	useEffect(() => {
		if (email.length > 0) {
			// Check email validity using regex
			const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			setIsValidEmail(emailPattern.test(email));
		}

		if (password && password.length > 0 && email && isValidEmail) {
			setisbtndisabled(false);
		}
	}, [email, password]);

	const handleOnChange = (e) => {
		setEmail(e.target.value);
	};

	const handleOnChangePassword = (e) => {
		setPassword(e.target.value);
	};

	const handlePasswordView = () => {
		setShowPassword(!showPassword);
	};

	const handleSubmit = async () => {
		const BASE_URL = "https://academics.newtonschool.co/api/v1";
		const headers = { projectId: import.meta.env.VITE_NEWTON_PROJECT_ID };
		try {
			setLoading(true);
			console.log(email, password);

			// Check if the email is valid
			if (!isValidEmail) {
				toast({
					title: "Invalid Email",
					description: "Please enter a valid email address.",
					status: "error",
					duration: 3000,
					isClosable: true,
				});
				setLoading(false);
				return;
			}

			// Make a POST request to the login API with headers
			const login_url = `${BASE_URL}/user/login`;
			const data = {
				email: email,
				password: password,
				appType: "ott",
			};
			const response = await axios.post(login_url, data, { headers });
			console.log(response);

			// Check if login was successful
			if (response.data.status === "success") {
				// Redirect to the desired page upon successful login
				toast({
					title: "WELCOME",
					description: "You are logged in",
					status: "success",
					duration: 2000,
					isClosable: true,
				});

				localStorage.setItem("user", JSON.stringify(response.data));
				const decodeToken = jwtDecode(response.data.token);
				const currTime = Date.now() / 1000;
				if (decodeToken.exp < currTime) {
					throw new Error("Token expired, please login again");
				}
				navigate("/");
			} else {
				// Display an error toast message
				toast({
					title: "Login Failed",
					description: "Invalid email or password",
					status: "error",
					duration: 3000,
					isClosable: true,
				});
			}
		} catch (error) {
			console.error("Login error:", error);
			// Handle any errors that occurred during the API call
			toast({
				title: "Error occured",
				description: error.message,
				status: "error",
				duration: 4000,
				isClosable: true,
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className={style.mainBg}>
			<Box className={style.login}>
				{/* Heading and Text */}
				<Heading
					fontSize={{ base: "1.3rem", sm: "1.6rem", md: "1.8rem" }}
					p="0rem 0rem 0.5rem"
					lineHeight={"1.35rem"}
					className={style.mainHead}
					as="h4"
				>
					Login to Zee5
				</Heading>
				<Text w="85%" fontWeight="500" textAlign="center" className={style.subhead}>
					Login to continue enjoying uninterrupted video and personalised experience.
				</Text>

				{/* Icon section */}
				<Flex
					height={"2rem"}
					justifyContent={"space-between"}
					alignItems={"center"}
					className={style.icons}
					width={{ base: "10rem", sm: "10rem", md: "10rem" }}
				>
					<Image
						width={{ base: "2.1rem", sm: "2.8rem", md: "3.4rem" }}
						height={{ base: "2.1rem", sm: "2.8rem", md: "3.4rem" }}
						cursor="pointer"
						src={google}
						alt="Google Icon"
					/>
					<Image
						boxShadow="0px 4px 3px grey"
						borderRadius="50%"
						width={{ base: "1.7rem", sm: "2.5rem", md: "3rem" }}
						height={{ base: "1.7rem", sm: "2.5rem", md: "3rem" }}
						cursor="pointer"
						src={github}
						alt="GitHub Icon"
					/>
				</Flex>

				<Flex className={style.optionOr}>
					<Box>or</Box>
				</Flex>

				{/* Input section */}
				<Flex pos="relative" outline="none" alignItems="center" className={style.input}>
					<Flex
						gap="1vh"
						display={"flex"}
						direction="column"
						alignItems="center"
						justifyContent="center"
						width="100%"
					>
						<Input
							value={email}
							onChange={(e) => handleOnChange(e)}
							name="email"
							outline="none"
							transition="none"
							placeholder="Enter email"
							border={
								isValidEmail
									? loading
										? "1px solid #FFFFFF80"
										: "1px solid black"
									: "1px solid red"
							}
							borderRadius="5px"
							focusBorderColor="black"
							onKeyDownCapture={(e) => {
								if (e.key === "Enter") {
									handleSubmit();
								}
							}}
						/>
						<InputGroup>
							<Input
								type={showPassword ? "text" : "password"}
								value={password}
								onChange={(e) => handleOnChangePassword(e)}
								name="password"
								outline="none"
								transition="none"
								placeholder="Enter password"
								border={loading ? "1px solid #FFFFFF80" : "1px solid black"}
								borderRadius="5px"
								focusBorderColor="black"
								onKeyDownCapture={(e) => {
									if (e.key === "Enter") {
										handleSubmit();
									}
								}}
							/>
							<InputRightElement width="4.5rem">
								<Button h="1.75rem" size="sm" onClick={handlePasswordView}>
									{showPassword ? <ViewOffIcon /> : <ViewIcon />}
								</Button>
							</InputRightElement>
						</InputGroup>
					</Flex>
				</Flex>

				<button
					style={isbtndisabled || loading ? loginButtonStyleDontAllow : loginButtonStyleAllow}
					onClick={handleSubmit}
					disabled={isbtndisabled || !isValidEmail}
					className={style.button}
				>
					{loading ? <Spinner /> : auth}
				</button>

				<Text
					onClick={() => {
						navigate("/register");
					}}
					cursor="pointer"
				>
					<span className={style.bottom_text} style={{ color: "#000000" }}>
						New to Zee5 ?
					</span>{" "}
					<span id={style.register}>Register</span>
				</Text>
			</Box>
		</div>
	);
};

export default Login;
