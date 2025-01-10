import React from "react";
import "../styles/Navbar.css";

export default function Navbar({
  query,
  setQuery,
  isOpenList,
  onOpenList,
  isSettings,
  onOpenSettings,
}) {
  return (
    <nav className="navbar">
      <button
        style={{ justifySelf: "start" }}
        className="btn square"
        onClick={() => onOpenSettings((state) => !state)}
      >
        <img
          src={
            isSettings
              ? "/icons/black-close-icon.svg"
              : "icons/settings-icon.png"
          }
          alt="open bookmarks"
        />
      </button>
      <form>
        <img
          src="icons/search-icon.svg"
          alt="search movies"
          style={{ width: "14px" }}
        />
        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query !== "" && (
          <img
            src="icons/close-icon.svg"
            alt="reset query"
            style={{ width: "12px" }}
            onClick={() => setQuery("")}
          />
        )}
      </form>
      <button
        className="btn square"
        style={{
          justifySelf: "end",
          pointerEvents: isSettings ? "none" : "auto",
          background: isSettings ? "var(--clr-light)" : "var(--clr-white)",
        }}
        onClick={() => onOpenList((state) => !state)}
      >
        <img
          src={
            isOpenList
              ? "/icons/black-close-icon.svg"
              : "icons/bookmark-icon.svg"
          }
          alt="open bookmarks"
        />
      </button>
    </nav>
  );
}
