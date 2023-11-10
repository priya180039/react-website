import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Main from "../components/Main";
import Sidebar from "../components/Sidebar";
import NewPost from "../components/NewPost";
import { Navigate } from "react-router-dom";
import { useHeader } from "../features/HeaderContext";

const Home = () => {
  const { sideToggle } = useHeader();
  const [pageScroll, setPageScroll] = useState(false);
  const contentElement = document.getElementById("container");

  useEffect(() => {
    if (contentElement) {
      if (contentElement.offsetHeight > window.innerHeight) {
        setPageScroll(true);
      } else {
        setPageScroll(false);
      }
    }
  }, [contentElement]);

  return (
    <div className={`bg-main-low min-w-screen min-h-screen bg-fixed bg-cover`}>
      <div id="container">
        {localStorage.getItem("isAuth") === "true" ? (
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
              className={`lg:hidden xl:hidden md:flex sm:block justify-between flex-1 ${
                pageScroll
                  ? "md:w-[calc(100%-.5rem)] sm:w-[calc(100vw-.5rem)]"
                  : ""
              }`}
            >
              <div
                className={`md:w-[calc(16.666667%-1rem)] md:translate-x-0 lg:translate-x-0 xl:translate-x-0 ${
                  sideToggle ? "" : "-translate-x-full"
                }`}
              >
                <Sidebar />
              </div>
              <div
                className={`flex flex-col flex-1 md:w-10/12 sm:w-full md:mix-blend-normal lg:mix-blend-normal xl:mix-blend-normal`}
              >
                <NewPost />
                <Main />
              </div>
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
