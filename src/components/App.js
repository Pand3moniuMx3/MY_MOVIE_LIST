import React, { useState, useEffect } from "react";
import "../styles/App.css";
import Navbar from "./Navbar";
import Box from "./Box";
import MoviesList from "./MoviesList";
import WatchedList from "./WatchedList";
import Summary from "./Summary";
import DataItem from "./DataItem";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import MovieDetail from "./MovieDetail";
import Settings from "./Settings";

// calculating the average
const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

// environment
const KEY = "88830a57";

export default function App() {
  // state
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [isOpenList, setIsOpenList] = useState(false);
  const [isSettings, setIsSettings] = useState(false);
  const [added, setAdded] = useState(() => {
    const savedAdded = localStorage.getItem("added");
    return savedAdded ? JSON.parse(savedAdded) : [];
  });

  // Save `added` state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("added", JSON.stringify(added));
  }, [added]);

  // sorting logic
  const [sortBy, setSortBy] = useState("Default");
  let sortedAdded;
  if (sortBy === "Default") {
    sortedAdded = [...added];
  } else if (sortBy === "Alpabet") {
    sortedAdded = [...added].sort((a, b) => a.Title.localeCompare(b.Title));
  } else if (sortBy === "Latest") {
    sortedAdded = [...added].reverse();
  } else if (sortBy === "Completion") {
    sortedAdded = [...added].sort(
      (a, b) => Number(a.watched) - Number(b.watched)
    );
  }

  // user rating state
  const [starColor, setStarColor] = useState("#ffd700");
  const [textColor, setTextColor] = useState("#ffffff");
  const [maxRating, setMaxRating] = useState("10");

  // selecting the movie
  function handleSelectMovie(id) {
    setSelectedId(id);
  }

  // adding movie
  function handleAddMovie(updateFunction) {
    setAdded(updateFunction);
  }

  // toggle watched movies
  function handleToggleWatched(imdbID) {
    setAdded((prev) =>
      prev.map((movie) =>
        movie.imdbID === imdbID ? { ...movie, watched: !movie.watched } : movie
      )
    );
  }

  // fetching data
  useEffect(
    function () {
      const controller = new AbortController();

      async function fetchMovies() {
        try {
          setIsLoading(true);
          setIsError("");

          const res = await fetch(
            `//www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );

          if (!res.ok) throw new Error("Something went wrong");

          const data = await res.json();
          if (data.Response === "False") throw new Error("No movies found");

          setMovies(data.Search);
          setIsError("");
        } catch (err) {
          if (err.name !== "AbortError") {
            setIsError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      if (!query.length) {
        setMovies([]);
        setIsError("Search for movies");
        return;
      }

      fetchMovies();

      return function () {
        controller.abort();
      };
    },
    [query]
  );

  // derived state
  const avgImdbRating = average(added.map((movie) => movie.imdbRating)).toFixed(
    1
  );
  const avgUserRating = average(added.map((movie) => movie.userRating)).toFixed(
    1
  );
  const totalRuntime = added.reduce((acc, movie) => acc + movie.runtime, 0);

  console.log(added);

  return (
    <section>
      <Navbar
        query={query}
        setQuery={setQuery}
        isOpenList={isOpenList}
        onOpenList={setIsOpenList}
        isSettings={isSettings}
        onOpenSettings={setIsSettings}
      />
      <main>
        <Box>
          {isLoading && !isOpenList && !selectedId && !isSettings && (
            <>
              <Summary title={`Found ${movies.length || "0"} top results`} />
              <Loader />
            </>
          )}
          {!isLoading &&
            isError &&
            !isOpenList &&
            !selectedId &&
            !isSettings && (
              <>
                <Summary title={`Found ${movies.length || "0"} top results`} />
                <ErrorMessage message={isError} />
              </>
            )}
          {!isLoading &&
            !isError &&
            !isOpenList &&
            !selectedId &&
            !isSettings && (
              <>
                <Summary title={`Found ${movies.length || "0"} top results`} />
                <MoviesList
                  array={movies}
                  onSelectMovie={handleSelectMovie}
                  setIsOpenList={setIsOpenList}
                />
              </>
            )}
          {selectedId && !isOpenList && !isSettings && (
            <MovieDetail
              KEY={KEY}
              selectedId={selectedId}
              onSetMovieId={setSelectedId}
              onAddMovie={handleAddMovie}
              added={sortedAdded}
              starColor={starColor}
              textColor={textColor}
              maxRating={maxRating}
            />
          )}
          {isOpenList && !isSettings && (
            <>
              <Summary title="Movies you watched:">
                <div className="bottom-info">
                  <DataItem
                    icon="/icons/hashtag-icon.svg"
                    value={sortedAdded.length}
                  />
                  <DataItem icon="/icons/star-icon.svg" value={avgImdbRating} />
                  <DataItem icon="/icons/star-icon.svg" value={avgUserRating} />
                  <DataItem
                    icon="/icons/clock-icon.svg"
                    value={`${totalRuntime} min`}
                  />
                </div>
              </Summary>
              <WatchedList
                array={sortedAdded}
                onSelectMovie={handleSelectMovie}
                setIsOpenList={setIsOpenList}
                onToggleWatched={handleToggleWatched}
              />
            </>
          )}
          {isSettings && (
            <>
              <Summary title="Settings" />
              <Settings
                sortBy={sortBy}
                onSort={setSortBy}
                starColor={starColor}
                textColor={textColor}
                maxRating={maxRating}
                setStarColor={setStarColor}
                setTextColor={setTextColor}
                setMaxRating={setMaxRating}
              />
            </>
          )}
        </Box>
      </main>
    </section>
  );
}
