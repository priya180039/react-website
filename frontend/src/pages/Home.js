import React, { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import Main from "../components/Main";
import Sidebar from "../components/Sidebar";
import NewPost from "../components/NewPost";
import { Navigate } from "react-router-dom";
import { useHeader } from "../features/HeaderContext";
import { BiSolidChevronUpCircle } from "react-icons/bi";

const Home = () => {
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

    document.addEventListener("mousedown", handleOutside);

    return () => {
      document.removeEventListener("mousedown", handleOutside);
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
              <Main />
              <NewPost />
            </div>

            {/* Ketika screen medium atau kurang */}
            <div
              className={`lg:hidden xl:hidden md:flex sm:block justify-between flex-1 md:w-screen sm:w-[calc(100vw-.5rem)]`}
            >
              <div
                ref={sideRef}
                className={`md:w-[calc(16.666667%-1rem)] md:translate-x-0 lg:translate-x-0 xl:translate-x-0 ${
                  sideToggle ? "w-screen" : "-translate-x-full"
                }`}
              >
                <Sidebar />
              </div>
              <div
                className={`flex overflow-y-hidden flex-col flex-1 md:w-[calc(83.333333% - .5rem)] sm:w-full md:mix-blend-normal lg:mix-blend-normal xl:mix-blend-normal`}
              >
                <NewPost />
                <Main />
              </div>
            </div>
            <div className="flex justify-center w-full mx-auto lg:hidden xl:hidden text-gray-200 text-4xl">
              <a href="#container">
                <BiSolidChevronUpCircle />
              </a>
            </div>
          </>
        ) : (
          <Navigate to="/sign" />
        )}
      </div>
    </div>
  );
};

export default Home;
