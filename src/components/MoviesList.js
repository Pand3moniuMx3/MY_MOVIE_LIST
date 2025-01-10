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
          movie={movie}
          key={index}
          onSelectMovie={onSelectMovie}
          setIsOpenList={setIsOpenList}
        >
          <DataItem icon="/icons/calendar-icon.svg" value={movie.Year} />
        </Item>
      ))}
    </ul>
  );
}
