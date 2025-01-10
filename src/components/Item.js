import React from "react";
import "../styles/Item.css";

export default function Item({
  movie,
  children,
  onSelectMovie,
  setIsOpenList,
  customClass,
}) {
  return (
    <li className={`item ${customClass}`}>
      <img src={movie.Poster} alt={movie.Title} className="poster" />
      <div className="info">
        <b
          className="title"
          onClick={() => {
            setIsOpenList(false);
            onSelectMovie(movie.imdbID);
          }}
        >
          {movie.Title}
        </b>
        <div className="bottom-info">{children}</div>
      </div>
    </li>
  );
}
