import React from "react";
import "./App.css";
import Home from "./pages/Home";
import ReactGA from "react-ga";

const trackingId = "UA-176116817-1"; // Replace with your Google Analytics tracking ID
ReactGA.initialize(trackingId);
ReactGA.pageview(window.location.pathname + window.location.search);

const App = () => {
  return <Home />;
};

export default App;
