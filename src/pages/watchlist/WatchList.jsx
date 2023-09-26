import React, { useEffect, useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import MovieCard from "../../components/movieCard/MovieCard";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Header from "../../components/header/Header";
import "./style.scss";

function WatchList() {
	const toast = useToast();

	const [userData, setUserData] = useState(null);
	const [watchlistData, setWatchlistData] = useState(null);

	const query = useParams();

	const { data, loading, error } = useFetch(`/movie/565770`);

	// Define the URL and headers
	const BASE_URL = "https://academics.newtonschool.co/api/v1";
	const WATCHLIST_URL = `${BASE_URL}/ott/watchlist/like`;
	const headers = {
		Authorization: userData?.token,
		projectID: import.meta.env.VITE_NEWTON_PROJECT_ID,
	};

	// Function to add/remove a show from the watchlist
	const addToWatchlist = async (showId) => {
		try {
			// Request body
			const requestBody = {
				showId: showId, // Replace with the showId you want to add/remove
			};

			// Send the PATCH request
			const response = await axios.patch(WATCHLIST_URL, requestBody, { headers });

			// Check the response and handle accordingly
			if (response.data.status === "success") {
				// Show added/removed from watchlist successfully
				toast({
					title: "Success",
					description: "Show added/removed from watchlist successfully.",
					status: "success",
					duration: 3000, // Display for 3 seconds
					isClosable: true,
				});

				// After successfully adding/removing from watchlist, fetch the updated watchlist data
				fetchWatchlistData();
			} else {
				// Display an error message
				toast({
					title: "Error",
					description: response.data.error.message,
					status: "error",
					duration: 3000, // Display for 3 seconds
					isClosable: true,
				});
			}
		} catch (error) {
			console.error("API request error:", error);

			// Handle any errors that occurred during the API call
			toast({
				title: "Error",
				description: "An error occurred while processing your request.",
				status: "error",
				duration: 3000, // Display for 3 seconds
				isClosable: true,
			});
		}
	};

	// Function to fetch watchlist data
	const fetchWatchlistData = async () => {
		// Define the URL for fetching watchlist data (replace with your actual endpoint)
		const WATCHLIST_DATA_URL = `${BASE_URL}/ott/watchlist`; // Update with your actual watchlist data URL

		try {
			// Fetch the watchlist data
			const response = await axios.get(WATCHLIST_DATA_URL, { headers });

			// Check if the request was successful
			if (response.data.status === "success") {
				// Update the watchlistData state with the fetched data
				setWatchlistData(response.data.data);
			}
		} catch (error) {
			console.error("Error fetching watchlist data:", error);
		}
	};

	useEffect(() => {
		// Retrieve data from local storage
		const storedData = localStorage.getItem("user");

		if (storedData) {
			const data = JSON.parse(storedData);
			setUserData(data);

			// Fetch initial watchlist data
			fetchWatchlistData();
		}
		// Example usage
		addToWatchlist(565770); // Call this function with the desired showId
	}, []);

	return (
		<div>
			<Header />
			{console.log("this is watchlist", watchlistData)}
			<div className="watchlist">Soon to be added ......</div>
		</div>
	);
}

export default WatchList;
