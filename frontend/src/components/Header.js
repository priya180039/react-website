import React, { useEffect, useRef, useState } from "react";
import { BiCog, BiMenu, BiFilterAlt, BiX } from "react-icons/bi";
import { LogoutUser } from "../features/AuthSlice";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { useHeader } from "../features/HeaderContext";
import { useFilter } from "../features/FilterContext";

const Header = () => {
  //COMMENT SCRIPT = CURRENTLY NOT IN USE

  const [scrollPosition, setScrollPosition] = useState(0);
  const [headerCollapse, setHeaderCollapse] = useState(false);
  const [expand, setExpand] = useState(false);
  const { sideToggle, setSideToggle, menuToggle, setMenuToggle } = useHeader();
  const { setActiveFilter } = useFilter();
  const buttonRef = useRef();
  const menuRef = useRef();
  const activeTab = sessionStorage.getItem("activeTab");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleOutsideLogout = (e) => {
      if (buttonRef.current && !buttonRef.current.contains(e.target)) {
        setExpand(false);
      }
    };
    const handleOutsideMenu = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuToggle(false);
      }
    };

    const handleScroll = () => {
      const currentPosition = window.scrollY;

      if (currentPosition > scrollPosition) {
        setHeaderCollapse(true);
        setMenuToggle(false);
        setExpand(false);
      } else {
        setHeaderCollapse(false);
      }

      setScrollPosition(currentPosition);
    };

    document.addEventListener("mousedown", handleOutsideLogout);
    document.addEventListener("mousedown", handleOutsideMenu);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleOutsideLogout);
      document.removeEventListener("mousedown", handleOutsideMenu);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [buttonRef, scrollPosition, setMenuToggle]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(LogoutUser());
    sessionStorage.setItem("isAuth", false);
    sessionStorage.setItem("activeTab", "home");
    sessionStorage.removeItem("isAuth");
    sessionStorage.removeItem("activeTab");
    sessionStorage.clear();
    navigate("/sign");
  };

  const setActiveTab = (val) => {
    sessionStorage.setItem("activeTab", val);
  };

  return (
    <header
      className={`w-full transform transition-all duration-300 ease-in fixed top-0 left-0 bg-sky-500 flex justify-between items-center px-8 z-50 ${
        headerCollapse && !sideToggle
          ? "-translate-y-full opacity-0"
          : "opacity-100"
      }`}
    >
      <div
        className={`block md:hidden lg:hidden xl:hidden px-2 py-3 ${
          sideToggle && "text-zinc-950 bg-gray-200"
        }`}
      >
        {sideToggle ? (
          <BiX
            onClick={() => setSideToggle(false)}
            className="text-3xl transform transition-all duration-200 ease-in-out scale-125 hover:scale-150 hover:font-bold hover:cursor-pointer"
          />
        ) : (
          <BiFilterAlt
            onClick={() => setSideToggle(true)}
            className="text-3xl transform transition-all duration-200 ease-in-out hover:text-gray-200 hover:cursor-pointer"
          />
        )}
      </div>
      <div className="border-b-4 -ml-2 text-zinc-950/90 transform transition-all duration-200 ease-in-out hover:text-gray-200 hover:cursor-pointer hover:border-zinc-950/90 rounded-3xl overflow-hidden">
        <NavLink
          onClick={() => {
            setActiveFilter("all");
            setActiveTab("home");
          }}
          to="/"
          className="gap-4 text-3xl font-bold font-orbitron"
        >
          F<span className="font-exo">ortech</span>
        </NavLink>
      </div>
      <nav className="hidden md:flex lg:flex xl:flex items-center text-xl">
        <NavLink
          onClick={() => {
            setActiveFilter("all");
            setActiveTab("home");
          }}
          to="/"
          className={`transform transition-all duration-200 ease-in-out px-4 py-4 hover:bg-gray-200 ${
            activeTab === "home"
              ? "bg-gray-200 hover:cursor-default"
              : "hover:cursor-pointer"
          }`}
        >
          Home
        </NavLink>
        <NavLink
          onClick={() => setActiveTab("dashboard")}
          to={activeTab === "dashboard" ? "#" : "#"}
          className={`transform transition-all duration-200 ease-in-out px-4 py-4 hover:bg-gray-200 ${
            activeTab === "dashboard"
              ? "bg-gray-200 hover:cursor-default"
              : "hover:cursor-pointer"
          }`}
        >
          Dashboard
        </NavLink>
        <NavLink
          onClick={() => setActiveTab("profile")}
          to="/profile"
          className={`transform transition-all duration-200 ease-in-out px-4 py-4 hover:bg-gray-200 ${
            activeTab === "profile"
              ? "bg-gray-200 hover:cursor-default"
              : "hover:cursor-pointer"
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
      <div
        ref={menuRef}
        className={`block md:hidden lg:hidden xl:hidden px-2 py-3 ${
          menuToggle && "bg-zinc-950 text-gray-200"
        }`}
      >
        {menuToggle ? (
          <BiX
            onClick={() => setMenuToggle(false)}
            className="text-3xl transform transition-all duration-200 ease-in-out scale-125 hover:scale-150 hover:font-bold hover:cursor-pointer"
          />
        ) : (
          <BiMenu
            onClick={() => setMenuToggle(true)}
            className="text-3xl transform transition-all duration-200 ease-in-out hover:text-gray-200 hover:cursor-pointer"
          />
        )}
      </div>
      <nav
        className={`absolute text-center text-gray-200 py-4 w-full bg-zinc-950/90 top-[3.4rem] left-0 flex flex-col h-fit md:hidden lg:hidden xl:hidden items-center text-xl transform transition-all duration-500 ease-in-out ${
          menuToggle ? "opacity-100" : "opacity-0 overflow-hidden"
        }`}
      >
        <NavLink
          onClick={() => setActiveTab("home")}
          to={activeTab === "home" ? "/" : "#"}
          className={`transform transition-all duration-200 ease-in-out w-full py-4 hover:bg-gray-200 hover:text-zinc-950/90 ${
            activeTab === "home"
              ? "bg-gray-200 hover:cursor-default text-zinc-950/90"
              : "hover:cursor-pointer"
          }`}
        >
          Home
        </NavLink>
        <NavLink
          onClick={() => setActiveTab("dashboard")}
          to={activeTab === "dashboard" ? "#" : "#"}
          className={`transform transition-all duration-200 ease-in-out w-full py-4 hover:bg-gray-200 hover:text-zinc-950/90 ${
            activeTab === "dashboard"
              ? "bg-gray-200 hover:cursor-default text-zinc-950/90"
              : "hover:cursor-pointer"
          }`}
        >
          Dashboard
        </NavLink>
        <NavLink
          onClick={() => setActiveTab("profile")}
          to={activeTab === "profile" ? "/profile" : "#"}
          className={`transform transition-all duration-200 ease-in-out w-full py-4 hover:bg-gray-200 hover:text-zinc-950/90 ${
            activeTab === "profile"
              ? "bg-gray-200 hover:cursor-default text-zinc-950/90"
              : "hover:cursor-pointer"
          }`}
        >
          Profile
        </NavLink>
        <NavLink
          onClick={(e) => handleLogout(e)}
          className="transform transition-all duration-200 ease-in-out w-full py-4 hover:bg-gray-200 hover:text-zinc-950/90 hover:cursor-pointer"
        >
          Logout
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
