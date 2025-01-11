import { useState } from "react";
import "../styles/Finder.css";

export default function FinderFilters({
  genreFilter,
  popularityFilter,
  fromYearFilter,
  toYearFilter,
  setGenreFilter,
  setPopularityFilter,
  setFromYearFilter,
  setToYearFilter,
  handleFindMovies,
}) {
  // arrays
  const genres = [
    {
      id: 28,
      name: "Action",
    },
    {
      id: 12,
      name: "Adventure",
    },
    {
      id: 16,
      name: "Animation",
    },
    {
      id: 35,
      name: "Comedy",
    },
    {
      id: 80,
      name: "Crime",
    },
    {
      id: 99,
      name: "Documentary",
    },
    {
      id: 18,
      name: "Drama",
    },
    {
      id: 10751,
      name: "Family",
    },
    {
      id: 14,
      name: "Fantasy",
    },
    {
      id: 36,
      name: "History",
    },
    {
      id: 27,
      name: "Horror",
    },
    {
      id: 10402,
      name: "Musical",
    },
    {
      id: 9648,
      name: "Mystery",
    },
    {
      id: 10749,
      name: "Romance",
    },
    {
      id: 878,
      name: "Sci-fi",
    },
    {
      id: 10770,
      name: "TV Movie",
    },
    {
      id: 53,
      name: "Thriller",
    },
    {
      id: 10752,
      name: "War",
    },
    {
      id: 37,
      name: "Western",
    },
  ];

  // expanding & collapsing filters
  const [genresExp, setGenresExp] = useState(false);
  const genresArray = genresExp ? genres : genres.slice(0, 4);

  // current year
  const currentYear = new Date(Date.now()).getFullYear();

  // opening filters on mobile
  const [isFiltersOpen, setIsFiltersOpen] = useState(true);

  return (
    <>
      <div className="filters-btn-container">
        <button
          className="filters-btn"
          onClick={() => setIsFiltersOpen((s) => !s)}
        >
          Filters
        </button>
      </div>
      {isFiltersOpen && (
        <aside>
          {isFiltersOpen && (
            <div className="mobile-title">
              <b>Find a movie</b>
              <img
                src="/icons/close-icon.svg"
                alt="close filters"
                onClick={() => setIsFiltersOpen(false)}
              />
            </div>
          )}
          <div className="filter">
            <b>Genre:</b>
            <div className="options">
              {genresArray.map((genre) => (
                <span
                  className="option"
                  onClick={() => setGenreFilter(genre.id)}
                  style={{
                    border:
                      genreFilter === genre.id && "1px solid var(--clr-theme",
                  }}
                >
                  {genre.name}
                </span>
              ))}
            </div>
            <p onClick={() => setGenresExp((s) => !s)}>Load more</p>
          </div>
          <div className="filter">
            <b>Popular vote: {popularityFilter}</b>
            <input
              type="range"
              min="0"
              max="10"
              value={popularityFilter}
              onChange={(e) => setPopularityFilter(Number(e.target.value))}
            />
          </div>
          <div className="filter">
            <b>Year range:</b>
            <div className="options">
              <input
                type="text"
                className="from"
                value={fromYearFilter}
                onChange={(e) => setFromYearFilter(Number(e.target.value))}
                style={{
                  border: fromYearFilter > currentYear && "1px solid red",
                }}
              />
              <input
                type="text"
                className="to"
                value={toYearFilter}
                onChange={(e) => setToYearFilter(Number(e.target.value))}
                style={{
                  border: toYearFilter < fromYearFilter && "1px solid red",
                }}
              />
            </div>
          </div>
          <button
            className="search-btn"
            style={{
              background:
                toYearFilter < fromYearFilter && "var(--clr-light-grey)",
              pointerEvents: toYearFilter < fromYearFilter && "none",
            }}
            onClick={handleFindMovies}
          >
            Search
          </button>
        </aside>
      )}
    </>
  );
}
