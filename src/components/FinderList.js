import React from "react";
import DataItem from "./DataItem";
import Item from "./Item";
import "../styles/Finder.css";

export default function FinderList({ array, onSelectMovie, setIsFinder }) {
  if (array.length === 0)
    return (
      <div className="message">
        <h3>No movies</h3>
      </div>
    );

  return (
    <main className="finder-list">
      {array.map((movie, index) => (
        <Item
          id={movie.id}
          title={movie.title}
          poster={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          key={index}
          onSelectMovie={onSelectMovie}
          onClick={() => setIsFinder(false)}
        >
          <DataItem
            icon="/icons/calendar-icon.svg"
            value={movie.release_date.split("-")[0] || "N/A"}
          />
        </Item>
      ))}
    </main>
  );
}
