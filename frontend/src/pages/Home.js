import React, { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import Main from "../components/Main";
import Sidebar from "../components/Sidebar";
import NewPost from "../components/NewPost";
import { Navigate } from "react-router-dom";
import { useHeader } from "../features/HeaderContext";
import { BiSolidChevronUpCircle } from "react-icons/bi";

const Home = () => {
  const [updated, setUpdated] = useState(false);
  const [pageScroll, setPageScroll] = useState(false);
  const { sideToggle, setSideToggle } = useHeader();
  const sideRef = useRef();
  const contentElement = document.getElementById("container");

  useEffect(() => {
    if (contentElement) {
      if (contentElement.offsetHeight > window.innerHeight) {
        setPageScroll(true);
      } else {
        setPageScroll(false);
      }
    }

    const handleOutside = (e) => {
      if (sideRef.current && !sideRef.current.contains(e.target)) {
        setSideToggle(false);
      }
    };

    const handleResize = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth > 768) {
        setSideToggle(false);
      }
    };

    document.addEventListener("mousedown", handleOutside);
    window.addEventListener("load", handleResize);
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("mousedown", handleOutside);
      window.removeEventListener("load", handleResize);
      window.removeEventListener("resize", handleResize);
    };
  }, [contentElement, sideRef, setSideToggle]);

  return (
    <div className={`bg-main-low min-w-screen min-h-screen bg-fixed bg-cover `}>
      <div id="container">
        {sessionStorage.getItem("isAuth") === "true" ? (
          <>
            <Header />
            {/* Ketika screen large atau lebih */}
            <div
              className={`hidden lg:flex xl:flex md:hidden sm:hidden justify-between flex-1 w-full ${
                pageScroll ? "w-[calc(100vw-.5rem)]" : ""
              }`}
            >
              <Sidebar />
              <Main updated={updated} setUpdated={setUpdated} />
              <NewPost setUpdated={setUpdated} />
            </div>

            {/* Ketika screen medium atau kurang */}
            <div
              className={`lg:hidden xl:hidden md:flex sm:block justify-between flex-1 md:w-[100vw-.5rem] sm:w-[calc(100vw-.5rem)]`}
            >
              <div
                ref={sideRef}
                className={`block md:hidden lg:hidden xl:hidden transform transition-all duration-500 ease-in-out ${
                  sideToggle ? "w-screen" : "-translate-x-full opacity-0"
                }`}
              >
                <Sidebar />
              </div>
              <div
                ref={sideRef}
                className={`hidden md:block lg:block xl:block md:w-[calc(17%)] md:opacity-100 lg:opacity-100 xl:opacity-100 md:translate-x-0 lg:translate-x-0 xl:translate-x-0 transform transition-all duration-500 ease-in-out`}
              >
                <Sidebar />
              </div>
              <div
                className={`flex overflow-y-hidden flex-col flex-1 md:w-[calc(83%)] sm:w-full md:mix-blend-normal lg:mix-blend-normal xl:mix-blend-normal transform transition-all duration-500 ease-in-out ${
                  sideToggle
                    ? "-translate-y-full opacity-0 overflow-hidden"
                    : ""
                }`}
              >
                <NewPost setUpdated={setUpdated} />
                <Main updated={updated} setUpdated={setUpdated} />
              </div>
            </div>
            <div
              className={`flex justify-center w-full mx-auto lg:hidden xl:hidden text-gray-200 text-4xl ${
                sideToggle && "hidden"
              }`}
            >
              <a href="#container">
                <BiSolidChevronUpCircle />
              </a>
            </div>
          </>
        ) : (
          <Navigate to="/welcome" />
        )}
      </div>
    </div>
  );
};

export default Home;
