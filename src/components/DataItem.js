import React from "react";
import "../styles/DataItem.css";

export default function DataItem({ icon, value }) {
  return (
    <div className="data-item">
      <img src={icon} alt="list length" />
      <p>{value}</p>
    </div>
  );
}
