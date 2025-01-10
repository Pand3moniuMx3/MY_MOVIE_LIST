import React from "react";
import "../styles/Summary.css";

export default function Summary({ title, children }) {
  return (
    <div className="summary">
      <b>{title}</b>
      {children}
    </div>
  );
}
