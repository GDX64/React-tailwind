import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import AppStore from "./Database/Store";

async function init() {
  const store = new AppStore();
  await store.getStored();
  ReactDOM.render(
    <React.StrictMode>
      <App store={store} />
    </React.StrictMode>,
    document.getElementById("root")
  );
}

init();
