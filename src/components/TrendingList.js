import React from "react";
import DataItem from "./DataItem";
import Item from "./Item";
import "../styles/List.css";

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
        >
          <DataItem
            icon="/icons/star-icon.svg"
            value={movie.vote_average.toFixed(1)}
          />
          <TrendingMarker />
        </Item>
      ))}
    </ul>
  );
}

function TrendingMarker() {
  return (
    <span className="trending-marker">
      <p>Trending</p>
    </span>
  );
}
