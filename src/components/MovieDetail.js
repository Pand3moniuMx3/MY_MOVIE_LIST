import { useEffect, useState } from "react";
import "../styles/MovieDetail.css";
import ReturnBtn from "./ReturnBtn";
import Loader from "./Loader";
import StarRating from "./StarRating";

export default function MovieDetail({
  KEY,
  selectedId,
  onSetMovieId,
  onAddMovie,
  added,
  starColor,
  textColor,
  maxRating,
}) {
  // state
  const [movieDetails, setMovieDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");

  // derived state
  const isAdded = added.some((movie) => movie.id === selectedId);

  useEffect(() => {
    if (!selectedId) return;

    async function getMovieDetails() {
      try {
        setIsLoading(true);
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${selectedId}?api_key=${KEY}`
        );
        const data = await res.json();
        setMovieDetails(data);
        console.log(data);
      } finally {
        setIsLoading(false);
      }
    }
    getMovieDetails();
  }, [KEY, selectedId]);

  // adding movie to list
  function handleBookmark() {
    if (!movieDetails) return;

    const newMovie = {
      id: movieDetails.id,
      title: movieDetails.title,
      year: movieDetails.release_date.split("-").at(0),
      poster_path: `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`,
      vote_average: movieDetails.vote_average,
      runtime: movieDetails.runtime,
      userRating,
      watched: false,
      watchedDate: null,
    };

    if (isAdded) {
      onAddMovie((prev) =>
        prev.filter((movie) => movie.id !== movieDetails.id)
      );
    } else {
      onAddMovie((prev) => [...prev, newMovie]);
    }
  }

  // changing page title
  useEffect(
    function () {
      document.title = movieDetails
        ? `Movie | ${movieDetails.title}`
        : "Loading movie...";

      return function () {
        document.title = "My Movie List";
      };
    },
    [movieDetails]
  );

  return (
    <>
      <ReturnBtn onClick={() => onSetMovieId(null)} />
      {isLoading ? (
        <>
          <div />
          <Loader />
        </>
      ) : (
        movieDetails && (
          <>
            <Overview
              movieDetails={movieDetails}
              onBookmark={handleBookmark}
              isAdded={isAdded}
            />
            <MoreDetails
              movieDetails={movieDetails}
              setUserRating={setUserRating}
              starColor={starColor}
              textColor={textColor}
              maxRating={maxRating}
            />
          </>
        )
      )}
    </>
  );
}

function Overview({ movieDetails, onBookmark, isAdded }) {
  return (
    <div className="overview">
      {movieDetails.poster_path !== "N/A" ? (
        <img
          className="poster"
          src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
          alt={movieDetails.title}
        />
      ) : (
        <div className="filler">
          <p>Poster unavailable</p>
        </div>
      )}
      <div className="info-wrapper">
        <div className="heading">
          <h3>{movieDetails.title}</h3>
          <svg
            width="18"
            height="22"
            viewBox="0 0 18 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={onBookmark}
          >
            <g id="Big Bookmark Icon" clipPath="url(#clip0_337_2)">
              <path
                id="Bookmark"
                d="M1 21V1H17V21L9 14.3333L1 21Z"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill={isAdded ? "white" : ""}
              />
            </g>
            <defs>
              <clipPath id="clip0_337_2">
                <rect width="18" height="22" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
        <p>{movieDetails.release_date}</p>
        <div style={{ display: "flex", gap: "var(--inner-gap)" }}>
          {movieDetails.genres.map((genre) => (
            <p key={genre.id}>{genre.name}</p>
          ))}
        </div>
        <div className="rating-wrapper">
          <img src="/icons/star-icon.svg" alt="imdb rating" />
          <p>{movieDetails.vote_average} IMDb rating</p>
        </div>
      </div>
    </div>
  );
}

function MoreDetails({
  movieDetails,
  setUserRating,
  starColor,
  textColor,
  maxRating,
}) {
  return (
    <div className="more-details">
      <div className="rating">
        <p>Add your rating:</p>
        <StarRating
          starColor={starColor}
          textColor={textColor}
          maxRating={maxRating}
          onSetRating={setUserRating}
        />
      </div>
      <div className="detail">
        <b>Plot:</b>
        <p>"{movieDetails.overview}"</p>
      </div>
      <div className="detail">
        <b>Revenue:</b>
        <p>${movieDetails.revenue}</p>
      </div>
      <div className="detail">
        <b>Tagline:</b>
        <p>{movieDetails.tagline}</p>
      </div>
    </div>
  );
}
