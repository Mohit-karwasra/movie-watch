import React, { useEffect, useState } from "react";
import style from "./style.module.scss";
import { Box, Spinner, useToast, Text, Heading, Flex, Link, Image, Input } from "@chakra-ui/react";
import { ChevronUpIcon } from "@chakra-ui/icons";

import github from "../../../assets/github-142-svgrepo-com.svg";
import google from "../../../assets/google-color-svgrepo-com.svg";

import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { Loginn } from "../Redux/Auth/auth.action";

let obj = { data: "" };

const auth = "register";

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

const Register = () => {
	const [name, setName] = useState(""); // Add name state
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isEmailValid, setEmailValid] = useState(false);
	const [loading, setLoading] = useState(false);
	const [isChecked, setIsChecked] = useState(false);

	const [isbtndisabled, setisbtndisabled] = useState(true);

	const navigate = useNavigate();
	const toast = useToast();

	useEffect(() => {
		document.title = "Ze5 | Register";
		// alert("Please Login to go forward")
	}, []);

	const handleEmailChange = (e) => {
		const emailValue = e.target.value;
		setEmail(emailValue);

		// Validate the email using a regular expression
		const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
		setEmailValid(emailRegex.test(emailValue));
	};

	const handleCheckbox = () => {
		setIsChecked(!isChecked);
		if (email && password && name) {
			setisbtndisabled(false);
		}
	};

	const handleRegister = async () => {
		if (!name || !email || !password || !isEmailValid) {
			toast({
				title: "Please fill in all fields with valid information.",
				status: "error",
				duration: 5000,
				isClosable: true,
			});
			setLoading(false);
			return;
		}

		const BASE_URL = "https://academics.newtonschool.co/api/v1";
		const headers = { projectId: import.meta.env.VITE_NEWTON_PROJECT_ID };

		// Use Axios for registration
		try {
			const signup_url = `${BASE_URL}/user/signup`;
			const data = {
				name: name,
				email: email,
				password: password,
				appType: "ott",
			};
			const response = await axios.post(signup_url, data, { headers });
			console.log(response);

			if (response.data.status === "success") {
				// Registration successful
				toast({
					title: "Registration Successful",
					status: "success",
					duration: 5000,
					isClosable: true,
				});

				// Redirect the user to the login page or perform other actions
				navigate("/login");
			} else {
				// Registration failed
				const data = response.data;
				console.log(data.message);
				toast({
					title: "Registration Failed",
					description: data.message || "An error occurred during registration",
					status: "error",
					duration: 5000,
					isClosable: true,
				});
			}
		} catch (error) {
			console.error("Registration Error: ", error.message);
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
							value={name}
							onChange={(e) => setName(e.target.value)}
							name="data"
							outline="none"
							transition="ease"
							placeholder="Enter Name"
							border={loading ? "1px solid #FFFFFF80" : "1px solid black"}
							borderRadius="5px"
							focusBorderColor="black"
							onKeyDownCapture={(e) => {
								if (e.key === "Enter") {
									handleRegister();
								}
							}}
						/>

						<Input
							value={email}
							onChange={handleEmailChange}
							name="data"
							outline="none"
							transition="ease"
							placeholder="Enter email"
							border={
								isEmailValid
									? loading
										? "1px solid #FFFFFF80"
										: "1px solid black"
									: "1px solid red"
							}
							borderRadius="5px"
							focusBorderColor="black"
							onKeyDownCapture={(e) => {
								if (e.key === "Enter") {
									handleRegister();
								}
							}}
						/>

						<Input
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							name="data"
							outline="none"
							transition="none"
							placeholder="Enter password"
							border={loading ? "1px solid #FFFFFF80" : "1px solid black"}
							borderRadius="5px"
							focusBorderColor="black"
							onKeyDownCapture={(e) => {
								if (e.key === "Enter") {
									handleRegister();
								}
							}}
						/>
					</Flex>
				</Flex>

				<Flex
					gap="0.2rem"
					alignItems="flex-start"
					justifyContent="space-between"
					width="80%"
					m="2rem auto 0rem"
				>
					<input
						onChange={handleCheckbox}
						name="checkbox"
						value="checkbox"
						checked={isChecked}
						className={style.checkBoxint}
						type="checkbox"
					/>{" "}
					<span className={style.checkbox}>
						By proceeding you agree to our <span className={style.btnColor}>Terms of Services</span>{" "}
						& <span className={style.btnColor}>Privacy Policy.</span>
					</span>
				</Flex>

				<button
					style={isbtndisabled || loading ? loginButtonStyleDontAllow : loginButtonStyleAllow}
					onClick={handleRegister}
					disabled={isbtndisabled || !isEmailValid}
					className={style.button}
				>
					{loading ? <Spinner /> : auth}
				</button>

				<Text
					onClick={() => {
						navigate("/login");
					}}
					cursor="pointer"
				>
					<span className={style.bottom_text} style={{ color: "#000000" }}>
						Already a customer ?
					</span>{" "}
					<span id={style.register}>Login</span>
				</Text>
			</Box>
		</div>
	);
};

export default Register;
