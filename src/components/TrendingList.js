import React from "react";
import DataItem from "./DataItem";
import Item from "./Item";
import "../styles/List.css";
import Marker from "./Marker";

export default function MoviesList({ array, onSelectMovie }) {
  if (array.length === 0)
    return (
      <ul className="list">
        <p>No movies</p>
      </ul>
    );

  const sortedArray = [...array].sort((a, b) => b.vote_count - a.vote_count);

  return (
    <ul className="list">
      {sortedArray.map((movie, index) => {
        // marker logic
        const isTrending =
          movie.vote_count >= 2000 &&
          movie.release_date.split("-").at(0) >= 2024;
        const isTopRated =
          movie.vote_count >= 2000 && movie.vote_average >= 7.5;
        return (
          <Item
            id={movie.id}
            title={movie.title}
            poster={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            key={index}
            onSelectMovie={onSelectMovie}
          >
            <DataItem
              icon="/icons/star-icon.svg"
              value={movie.vote_average.toFixed(1)}
            />
            {!isTopRated && isTrending && <Marker value="trending" />}
            {isTopRated && <Marker value="top rated" />}
          </Item>
        );
      })}
    </ul>
  );
}
