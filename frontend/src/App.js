import Landing from "./pages/Landing";
// import Login from "./components/Login";
import React from "react";
import "./index.css";
import "./input.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LandingForm from "./pages/LandingForm";
import { SignProvider } from "./features/SignContext";

function App() {
  return (
    <SignProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/welcome" element={<Landing />} />
          <Route path="/sign" element={<LandingForm />} />
        </Routes>
      </Router>
    </SignProvider>
  );
}

export default App;
