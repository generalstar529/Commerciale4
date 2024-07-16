import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Admin from "./Admin";
import "font-awesome/css/font-awesome.min.css";
if (window.location.pathname.search("/admin") !== -1) {
    ReactDOM.render(<Admin />, document.getElementById("root"));
} else {
    ReactDOM.render(<App />, document.getElementById("root"));
}
