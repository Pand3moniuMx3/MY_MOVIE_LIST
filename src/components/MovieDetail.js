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
  const isAdded = added.some((movie) => movie.imdbID === selectedId);

  useEffect(() => {
    if (!selectedId) return;

    async function getMovieDetails() {
      try {
        setIsLoading(true);
        const res = await fetch(
          `//www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        );
        const data = await res.json();
        setMovieDetails(data);
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
      imdbID: movieDetails.imdbID,
      Title: movieDetails.Title,
      year: movieDetails.Year,
      Poster: movieDetails.Poster,
      imdbRating: Number(movieDetails.imdbRating),
      runtime: Number(movieDetails.Runtime.split(" ").at(0)),
      userRating,
      watched: false,
    };

    if (isAdded) {
      onAddMovie((prev) =>
        prev.filter((movie) => movie.imdbID !== movieDetails.imdbID)
      );
    } else {
      onAddMovie((prev) => [...prev, newMovie]);
    }
  }

  // changing page title
  useEffect(
    function () {
      document.title = movieDetails
        ? `Movie | ${movieDetails.Title}`
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
      {movieDetails.Poster !== "N/A" ? (
        <img
          className="poster"
          src={movieDetails.Poster}
          alt={movieDetails.Title}
        />
      ) : (
        <div className="filler">
          <p>Poster unavailable</p>
        </div>
      )}
      <div className="info-wrapper">
        <div className="heading">
          <h3>{movieDetails.Title}</h3>
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
        <p>{movieDetails.Released}</p>
        <p>{movieDetails.Genre}</p>
        <div className="rating-wrapper">
          <img src="/icons/star-icon.svg" alt="imdb rating" />
          <p>{movieDetails.imdbRating} IMDb rating</p>
        </div>
        <p className="cast">Starring: {movieDetails.Actors}</p>
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
        <p>"{movieDetails.Plot}"</p>
      </div>
      <div className="detail">
        <b>Awards:</b>
        <p>{movieDetails.Awards}</p>
      </div>
      <div className="detail">
        <b>Director:</b>
        <p>Directed by {movieDetails.Director}</p>
      </div>
    </div>
  );
}
