import React from "react";
import "../styles/Item.css";

export default function Item({
  id,
  title,
  poster,
  children,
  onSelectMovie,
  onClick,
  customClass,
}) {
  const handleClick = () => {
    onSelectMovie(id);
    if (onClick) {
      onClick();
    }
  };

  return (
    <li className={`item ${customClass}`}>
      <img src={poster} alt={title} className="poster" />
      <div className="info">
        <b className="title" onClick={handleClick}>
          {title}
        </b>
        <div className="bottom-info">{children}</div>
      </div>
    </li>
  );
}
