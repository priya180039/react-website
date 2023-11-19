import Landing from "./pages/Landing";
// import Login from "./components/Login";
import React, { useEffect } from "react";
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
import Thread from "./pages/Thread";

function App() {
  useEffect(() => {
    const title = document.querySelector("title");
    title.textContent = "Fortech | Discussion Forum";
  }, []);
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
              <Route path="/thread/:id" element={<Thread />} />
            </Routes>
          </Router>
        </FilterProvider>
      </HeaderProvider>
    </SignProvider>
  );
}

export default App;
