import React from "react";
import "../styles/ErrorMessage.css";

export default function ErrorMessage({ message }) {
  return (
    <div className="error-container">
      <h3>{message}</h3>
    </div>
  );
}
