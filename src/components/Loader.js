import React from "react";
import "../styles/Loader.css";

function Loader() {
  return (
    <div className="loader-container">
      <img className="loader" src="/icons/loader-icon.svg" alt="loading" />
    </div>
  );
}

export default Loader;
