import React from "react";
import Header from "../components/Header";
import Main from "../components/Main";
import Sidebar from "../components/Sidebar";
import NewPost from "../components/NewPost";
import { Navigate } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-main-low h-screen w-screen bg-fixed bg-cover">
      {localStorage.getItem("isAuth") === "true" ? (
        <>
          <Header />
          <div className="flex justify-between flex-1 w-full">
            <Sidebar />
            <Main />
            <NewPost />
          </div>
        </>
      ) : (
        <Navigate to="/sign" />
      )}
    </div>
  );
};

export default Home;
