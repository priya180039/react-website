import React, { useEffect, useRef, useState } from "react";
import { BiCog, BiMenu, BiFilterAlt } from "react-icons/bi";
import { LogoutUser } from "../features/AuthSlice";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { useHeader } from "../features/HeaderContext";

const Header = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [headerCollapse, setHeaderCollapse] = useState(false);
  const [expand, setExpand] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const { sideToggle, setSideToggle } = useHeader();
  const buttonRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleOutside = (e) => {
      if (buttonRef.current && !buttonRef.current.contains(e.target)) {
        setExpand(false);
      }
    };

    const handleScroll = () => {
      const currentPosition = window.scrollY;

      if (currentPosition > scrollPosition) {
        setHeaderCollapse(true);
      } else {
        setHeaderCollapse(false);
      }

      setScrollPosition(currentPosition);
    };

    document.addEventListener("mousedown", handleOutside);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [buttonRef, scrollPosition]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(LogoutUser());
    localStorage.setItem("isAuth", false);
    localStorage.removeItem("isAuth");
    navigate("/sign");
  };

  return (
    <header
      className={`w-full transform transition-all duration-300 ease-in fixed bg-sky-500 flex justify-between items-center px-8 z-50 ${
        headerCollapse && !sideToggle
          ? "-translate-y-full opacity-0"
          : "opacity-100"
      }`}
    >
      <div className="block md:hidden lg:hidden xl:hidden py-3">
        <BiFilterAlt
          onClick={() => setSideToggle(!sideToggle)}
          className="ml-4 mr-0.5 text-3xl transform transition-all duration-200 ease-in-out hover:text-gray-200 hover:cursor-pointer"
        />
      </div>
      <div className="border-b-4 text-zinc-950/90 transform transition-all duration-200 ease-in-out hover:text-gray-200 hover:cursor-pointer hover:border-zinc-950/90 rounded-3xl overflow-hidden">
        <div className="gap-4 text-3xl font-bold font-orbitron">
          F<span className="font-exo">ortech</span>
        </div>
      </div>
      <nav className="hidden md:flex lg:flex xl:flex items-center text-xl">
        <NavLink
          onClick={() => setActiveTab("home")}
          to={activeTab === "home" ? "/" : "#"}
          className={`transform transition-all duration-200 ease-in-out px-4 py-4 hover:bg-gray-200 hover:cursor-pointer ${
            activeTab === "home" ? "bg-gray-200 hover:cursor-default" : ""
          }`}
        >
          Home
        </NavLink>
        <NavLink
          onClick={() => setActiveTab("dashboard")}
          to={activeTab === "dashboard" ? "#" : "#"}
          className={`transform transition-all duration-200 ease-in-out px-4 py-4 hover:bg-gray-200 hover:cursor-pointer ${
            activeTab === "dashboard" ? "bg-gray-200 hover:cursor-default" : ""
          }`}
        >
          Dashboard
        </NavLink>
        <NavLink
          onClick={() => setActiveTab("profile")}
          to={activeTab === "profile" ? "#" : "#"}
          className={`transform transition-all duration-200 ease-in-out px-4 py-4 hover:bg-gray-200 hover:cursor-pointer ${
            activeTab === "profile" ? "bg-gray-200 hover:cursor-default" : ""
          }`}
        >
          Profile
        </NavLink>
        <div ref={buttonRef}>
          <BiCog
            className="ml-4 mr-0.5 transform transition-all duration-200 ease-in-out hover:text-gray-200 hover:cursor-pointer"
            onClick={() => setExpand(!expand)}
          />
          <button
            onClick={(e) => handleLogout(e)}
            className={`absolute bg-gray-200 mt-1 transform transition-all duration-300 ease-in-out right-3 text-base rounded-md px-1 ${
              !expand ? "opacity-0 hidden" : "opacity-100"
            }`}
          >
            Logout
          </button>
        </div>
      </nav>
      <div className="block md:hidden lg:hidden xl:hidden">
        <BiMenu className="ml-4 mr-0.5 text-3xl transform transition-all duration-200 ease-in-out hover:text-gray-200 hover:cursor-pointer" />
      </div>
    </header>
  );
};

export default Header;
