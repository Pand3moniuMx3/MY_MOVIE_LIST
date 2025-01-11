import React, { useState } from "react";
import "../styles/Navbar.css";

export default function Navbar({
  query,
  setQuery,
  onOpenList,
  onOpenSettings,
  onOpenFinder,
}) {
  const [isMenu, setIsMenu] = useState(false);

  return (
    <nav className="navbar">
      <div className="filler" />
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
      <button className="btn square" onClick={() => setIsMenu((s) => !s)}>
        <img
          src={isMenu ? "icons/black-close-icon.svg" : "/icons/burger-icon.svg"}
          alt="open menu"
        />
      </button>
      {isMenu && (
        <menu className="menu-tab">
          <p
            className="menu-item"
            onClick={() => {
              onOpenList(true);
              onOpenFinder(false);
              onOpenSettings(false);
              setIsMenu(false);
            }}
          >
            My list
          </p>
          <p
            className="menu-item"
            onClick={() => {
              onOpenFinder(true);
              onOpenList(false);
              onOpenSettings(false);
              setIsMenu(false);
            }}
          >
            Find a movie
          </p>
          <p
            className="menu-item"
            onClick={() => {
              onOpenSettings(true);
              onOpenList(false);
              onOpenFinder(false);
              setIsMenu(false);
            }}
          >
            Settings
          </p>
        </menu>
      )}
    </nav>
  );
}
