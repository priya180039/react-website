import Landing from "./pages/Landing";
// import Login from "./components/Login";
import React from "react";
import "./input.css";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/welcome" element={<Landing />} />
      </Routes>
    </Router>
  );
}

export default App;
