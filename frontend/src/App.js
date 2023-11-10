import Landing from "./pages/Landing";
// import Login from "./components/Login";
import React from "react";
import "./index.css";
import "./input.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LandingForm from "./pages/LandingForm";
import { SignProvider } from "./features/SignContext";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import { FilterProvider } from "./features/FilterContext";
import { HeaderProvider } from "./features/HeaderContext";

function App() {
  return (
    <SignProvider>
      <HeaderProvider>
        <FilterProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/welcome" element={<Landing />} />
              <Route path="/sign" element={<LandingForm />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </Router>
        </FilterProvider>
      </HeaderProvider>
    </SignProvider>
  );
}

export default App;
