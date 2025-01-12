import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "var(--inner-gap)",
};

const starContainerStyle = {
  display: "flex",
  gap: "0px",
};

StarRating.propTypes = {
  maxRating: PropTypes.number,
  starColor: PropTypes.string,
  textColor: PropTypes.string,
  className: PropTypes.string,
  messages: PropTypes.array,
  defaultRating: PropTypes.number,
  onSetRating: PropTypes.func,
};

export default function StarRating({
  maxRating = 5,
  starColor = "yellow",
  textColor = "white",
  className = "",
  messages = [],
  movieDetails,
  onUpdateRating,
}) {
  const [rating, setRating] = useState(movieDetails.userRating);
  const [tempRating, setTempRating] = useState(0);

  function handleRating(id, newRating) {
    setRating(newRating);
    onUpdateRating((prev) =>
      prev.map((movie) =>
        movie.id === id
          ? {
              ...movie,
              userRating: newRating,
            }
          : movie
      )
    );
    console.log(newRating);
  }

  const textStyle = {
    lineHeight: "1px",
    fontSize: "16px",
    color: textColor,
  };

  return (
    <div style={containerStyle} className={className}>
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            onRate={() => handleRating(movieDetails.id, i + 1)}
            full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
            onHoverIn={() => setTempRating(i + 1)}
            onHoverOut={() => setTempRating(0)}
            starColor={starColor}
          />
        ))}
      </div>
      <p style={textStyle}>
        {messages.length === maxRating
          ? messages[tempRating ? tempRating - 1 : rating - 1]
          : tempRating || rating || ""}
      </p>
    </div>
  );
}

function Star({ onRate, full, onHoverIn, onHoverOut, starColor }) {
  const starStyle = {
    cursor: "pointer",
    paddingInline: "1px",
    margin: "0",
    display: "flex",
    alignItems: "center",
  };

  return (
    <span
      style={starStyle}
      onClick={onRate}
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%" }}
      >
        <g id="Rating Star" clip-path="url(#clip0_333_2)">
          <path
            id="StarIcon"
            d="M9.52447 1.96353C9.67415 1.50287 10.3259 1.50287 10.4755 1.96353L12.1329 7.06434C12.1998 7.27035 12.3918 7.40983 12.6084 7.40983H17.9717C18.4561 7.40983 18.6575 8.02964 18.2656 8.31434L13.9266 11.4668C13.7514 11.5941 13.678 11.8198 13.745 12.0258L15.4023 17.1266C15.552 17.5873 15.0248 17.9704 14.6329 17.6857L10.2939 14.5332C10.1186 14.4059 9.88135 14.4059 9.70611 14.5332L5.3671 17.6857C4.97524 17.9704 4.448 17.5873 4.59768 17.1266L6.25503 12.0258C6.32197 11.8198 6.24864 11.5941 6.07339 11.4668L1.73438 8.31434C1.34253 8.02964 1.54392 7.40983 2.02828 7.40983H7.39159C7.6082 7.40983 7.80018 7.27035 7.86712 7.06434L9.52447 1.96353Z"
            fill={full ? starColor : "none"}
            stroke={starColor}
            stroke-width="1.5"
            stroke-linejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_333_2">
            <rect width="20" height="20" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </span>
  );
}
