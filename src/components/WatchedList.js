import React from "react";
import DataItem from "./DataItem";
import Item from "./Item";
import "../styles/List.css";

export default function WatchedList({
  array,
  onSelectMovie,
  setIsOpenList,
  onToggleWatched,
}) {
  if (array.length === 0)
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h3 style={{ color: "var(--clr-light-grey)" }}>No movies</h3>
      </div>
    );

  return (
    <ul className="list">
      {array.map((movie, index) => (
        <Item
          id={movie.id}
          title={movie.title}
          poster={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          key={index}
          onSelectMovie={onSelectMovie}
          onClick={() => setIsOpenList(false)}
          customClass={movie.watched ? "checked" : ""}
        >
          <DataItem
            icon="/icons/star-icon.svg"
            value={movie.vote_average.toFixed(1)}
          />
          <DataItem
            icon="/icons/star-icon.svg"
            value={movie.userRating === "" ? "N/A" : movie.userRating}
          />
          <DataItem
            icon="/icons/clock-icon.svg"
            value={`${movie.runtime} min`}
          />
          <Checkbox
            checked={movie.watched}
            onChange={() => onToggleWatched(movie.id)}
          />
        </Item>
      ))}
    </ul>
  );
}

function Checkbox({ checked, onChange }) {
  return (
    <input
      type="checkbox"
      className="checkbox"
      checked={checked}
      onChange={onChange}
    />
  );
}
