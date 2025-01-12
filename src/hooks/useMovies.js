import { useState, useEffect } from "react";

const KEY = "944b3689ef2257366fec981f89fefb43";

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");

  useEffect(
    function () {
      const controller = new AbortController();

      async function fetchMovies() {
        try {
          setIsLoading(true);
          setIsError("");

          const res = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${KEY}&query=${query}`,
            { signal: controller.signal }
          );

          if (!res.ok) throw new Error("Something went wrong");

          const data = await res.json();
          if (data.Response === "False") throw new Error("No movies found");

          setMovies(data.results);
          setIsError("");
          console.log(data.results);
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

  return { movies, isLoading, isError };
}
