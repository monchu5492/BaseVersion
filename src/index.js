import React from "react";
import { hydrate } from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App";
import storeFactory from "./store";
import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap-css-only/css/bootstrap.min.css";
// import "@fortawesome/fontawesome-free/css/all.min.css";
// import "mdbreact/dist/css/mdb.css";
const store = storeFactory(false, window.__INITIAL_STATE__);

// This file makes the store available to our app
// By wrapping App in Provider we can use React-Redux connect

window.React = React;
window.store = store;

console.log("rendered from here...");

hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("react-container")
);
