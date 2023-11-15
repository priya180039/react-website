import React from "react";
import { Navigate } from "react-router-dom";
import Header from "../components/Header";
import ThreadDetail from "../components/ThreadDetail";

const Thread = () => {
  return (
    <div className={`bg-main-low min-w-screen min-h-screen bg-fixed bg-cover `}>
      <div id="container">
        {sessionStorage.getItem("isAuth") === "true" ? (
          <>
            <Header />
            <div className="flex flex-col mx-auto w-[98%] lg:w-[70%] xl:w-[70%]">
              <ThreadDetail />
            </div>
          </>
        ) : (
          <Navigate to="/welcome" />
        )}
      </div>
    </div>
  );
};

export default Thread;
