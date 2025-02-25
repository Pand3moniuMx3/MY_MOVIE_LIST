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
import Finder from "./Finder";
import FinderFilters from "./FinderFilters";
import FinderList from "./FinderList";
import TrendingList from "./TrendingList";
import { useMovies } from "../hooks/useMovies";
import { useLocalStorage } from "../hooks/useLocalStorage";

// calculating the average
const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

// environment
const KEY = "944b3689ef2257366fec981f89fefb43";

export default function App() {
  // state
  const [query, setQuery] = useState("");
  const [trending, setTrending] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [isOpenList, setIsOpenList] = useState(false);
  const [isSettings, setIsSettings] = useState(false);
  const [isFinder, setIsFinder] = useState(false);
  const [added, setAdded] = useLocalStorage([], "added");

  // fetching data
  const { movies, isLoading, isError } = useMovies(query);

  // sorting logic
  const [sortBy, setSortBy] = useLocalStorage("Default", "sortBy");
  let sortedAdded;
  if (sortBy === "Default") {
    sortedAdded = [...added];
  } else if (sortBy === "Alphabet") {
    sortedAdded = [...added].sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortBy === "Latest") {
    sortedAdded = [...added].reverse();
  } else if (sortBy === "Completion") {
    sortedAdded = [...added].sort(
      (a, b) => Number(a.watched) - Number(b.watched)
    );
  } else if (sortBy === "WatchedDate") {
    sortedAdded = [...added].sort(
      (a, b) => new Date(a.watchedDate) - new Date(b.watchedDate)
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
  function getFormattedDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Add leading zero
    const day = String(today.getDate()).padStart(2, "0"); // Add leading zero
    return `${year}-${month}-${day}`;
  }

  function handleToggleWatched(id) {
    setAdded((prev) =>
      prev.map((movie) =>
        movie.id === id
          ? {
              ...movie,
              watched: !movie.watched,
              watchedDate: movie.watched ? null : getFormattedDate(),
            }
          : movie
      )
    );
  }

  // fetching trending movies
  useEffect(() => {
    async function getTrendingMovies() {
      const res = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${KEY}&vote_average.gte=6.5&vote_average.lte=9&vote_count.gte=30&primary_release_date.gte=2024-06-06`
      );
      const data = await res.json();
      setTrending(data.results || []);
    }
    getTrendingMovies();
  }, []);

  // finder filters state
  const [genreFilter, setGenreFilter] = useState(28);
  const [popularityFilter, setPopularityFilter] = useState(5);
  const [fromYearFilter, setFromYearFilter] = useState(2000);
  const [toYearFilter, setToYearFilter] = useState(2025);
  const [finderMovies, setFinderMovies] = useState([]);

  // fetching movies for finder
  async function handleFindMovies() {
    const res = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${KEY}&with_genres=${genreFilter}&primary_release_date.gte=${fromYearFilter}-01-01&primary_release_date.lte=${toYearFilter}-01-01&vote_average.gte=${popularityFilter}&vote_average.lte=${
        popularityFilter + 2
      }&vote_count.gte=10`
    );
    const data = await res.json();
    setFinderMovies(data.results || []);
    console.log(data.result);
  }

  // derived state
  const avgImdbRating = average(
    added.map((movie) => movie.vote_average)
  ).toFixed(1);
  const avgUserRating = average(added.map((movie) => movie.userRating)).toFixed(
    1
  );
  const totalRuntime = added.reduce((acc, movie) => acc + movie.runtime, 0);

  return (
    <section>
      <Navbar
        query={query}
        setQuery={setQuery}
        onOpenList={setIsOpenList}
        onOpenSettings={setIsSettings}
        onOpenFinder={setIsFinder}
      />
      <main>
        <Box>
          {!selectedId &&
            !isSettings &&
            !isOpenList &&
            !isFinder &&
            query === "" && (
              <>
                <Summary title={`Latest top movies`} />
                <TrendingList
                  array={trending}
                  onSelectMovie={handleSelectMovie}
                />
              </>
            )}
          {isLoading &&
            !isOpenList &&
            !selectedId &&
            !isSettings &&
            !isFinder &&
            query !== "" && (
              <>
                <Summary title={`Found ${movies.length || "0"} top results`} />
                <Loader />
              </>
            )}
          {!isLoading &&
            isError &&
            !isOpenList &&
            !selectedId &&
            !isSettings &&
            !isFinder &&
            query !== "" && (
              <>
                <Summary title={`Found ${movies.length || "0"} top results`} />
                <ErrorMessage message={isError} />
              </>
            )}
          {!isLoading &&
            !isError &&
            !isOpenList &&
            !selectedId &&
            !isSettings &&
            !isFinder &&
            query !== "" && (
              <>
                <Summary
                  title={`Found ${movies.length || "0"} top results`}
                  onClick={() => setQuery("")}
                />
                <MoviesList
                  array={movies}
                  onSelectMovie={handleSelectMovie}
                  setIsOpenList={setIsOpenList}
                />
              </>
            )}
          {selectedId && !isOpenList && !isSettings && !isFinder && (
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
          {isFinder && (
            <>
              <Summary
                title="Find a movie"
                onClick={() => setIsFinder(false)}
              />
              <Finder>
                <FinderFilters
                  genreFilter={genreFilter}
                  popularityFilter={popularityFilter}
                  fromYearFilter={fromYearFilter}
                  toYearFilter={toYearFilter}
                  setGenreFilter={setGenreFilter}
                  setPopularityFilter={setPopularityFilter}
                  setFromYearFilter={setFromYearFilter}
                  setToYearFilter={setToYearFilter}
                  handleFindMovies={handleFindMovies}
                />
                <FinderList
                  array={finderMovies}
                  onSelectMovie={handleSelectMovie}
                  setIsFinder={setIsFinder}
                />
              </Finder>
            </>
          )}
          {isOpenList && (
            <>
              <Summary
                title="Movies you watched:"
                onClick={() => setIsOpenList(false)}
              >
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
              <Summary title="Settings" onClick={() => setIsSettings(false)} />
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
