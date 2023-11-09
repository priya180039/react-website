import React, { useEffect, useRef, useState } from "react";
import { BiCog } from "react-icons/bi";
import { LogoutUser } from "../features/AuthSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [expand, setExpand] = useState(false);
  const buttonRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleOutside = (e) => {
      if (buttonRef.current && !buttonRef.current.contains(e.target)) {
        setExpand(false);
      }
    };

    document.addEventListener("mousedown", handleOutside);

    return () => {
      document.removeEventListener("mousedown", handleOutside);
    };
  }, [buttonRef]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(LogoutUser());
    localStorage.setItem("isAuth", false);
    localStorage.removeItem("isAuth");
    navigate("/sign");
  };

  return (
    <header className="w-full bg-sky-500 flex justify-between items-center px-10 py-3">
      <div className="border-b-4 rounded-3xl overflow-hidden">
        <div className="gap-4 text-3xl font-bold font-orbitron text-zinc-950/90">
          F<span className="font-exo">ortech</span>
        </div>
      </div>
      <nav className="flex items-center gap-9 text-xl">
        <button>Home</button>
        <button>Dashboard</button>
        <button>Profile</button>
        <div ref={buttonRef}>
          <BiCog onClick={() => setExpand(!expand)} />
          <button
            onClick={(e) => handleLogout(e)}
            className={`absolute bg-gray-200 mt-1 transform transition-all duration-300 ease-in-out right-5 text-base rounded-md px-1 ${
              !expand ? "opacity-0 hidden" : "opacity-100"
            }`}
          >
            Logout
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
