import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import AppStore from "./Database/Store";

async function init() {
  await AppStore.getStored();
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById("root")
  );
}

init();
