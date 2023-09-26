import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./style.scss";

import useFetch from "../../../hooks/useFetch";

import Img from "../../../components/lazyLoadImage/Img";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import CircleRating from "../../../components/circleRating/CircleRating";
import dayjs from "dayjs";

const HeroBanner = () => {
	const navigate = useNavigate();
	const { url } = useSelector((state) => state.home);
	const { data, loading } = useFetch("/movie/now_playing?language=en-US&page=1");

	let bannerArray;
	bannerArray = data?.results?.slice(0, 6);

	return (
		<div className="heroBanner">
			<Carousel
				autoPlay
				centerMode
				infiniteLoop
				interval={4000}
				swipeable={true}
				showThumbs={false}
				emulateTouch
			>
				{!loading &&
					(bannerArray =
						data?.results?.slice(0, 6) &&
						bannerArray.map((movie, i) => (
							<div key={i}>
								<div key={i}>
									<Img
										src={movie?.["backdrop_path"] ? url.poster + movie?.["backdrop_path"] : ""}
									/>
									<div className="heroBanner-content">
										<h2>{movie?.original_title}</h2>
										<p>{dayjs(movie.release_date || movie.first_air_date).format("MMM D, YYYY")}</p>
										<CircleRating rating={movie?.vote_average.toFixed(1)} />
									</div>
								</div>
								<div className="opacity-layer"></div>
							</div>
						)))}
			</Carousel>
		</div>
	);
};

export default HeroBanner;
