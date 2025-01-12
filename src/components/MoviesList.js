import React from "react";
import DataItem from "./DataItem";
import Item from "./Item";
import "../styles/List.css";
import Marker from "./Marker";

export default function MoviesList({ array, onSelectMovie, setIsOpenList }) {
  if (array.length === 0)
    return (
      <ul className="list">
        <p>No movies</p>
      </ul>
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
        >
          <DataItem
            icon="/icons/calendar-icon.svg"
            value={movie.release_date.split("-")[0] || "N/A"}
          />
          {movie.vote_count >= 2000 &&
            movie.release_date.split("-").at(0) >= 2024 && (
              <Marker value="trending" />
            )}
          {movie.vote_count >= 2000 && movie.vote_average >= 7.5 && (
            <Marker value="top rated" />
          )}
        </Item>
      ))}
    </ul>
  );
}
