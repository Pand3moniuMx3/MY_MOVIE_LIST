import React from "react";
import "../styles/Summary.css";

export default function Summary({ title, children, onClick }) {
  return (
    <div className="summary">
      <div className="title">
        <b>{title}</b>
        <img src="/icons/close-icon.svg" alt="close tab" onClick={onClick} />
      </div>
      {children}
    </div>
  );
}
