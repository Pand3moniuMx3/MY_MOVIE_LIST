import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import StarRating from "./components/StarRating";
import TextExpander from "./components/TextExpander";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
