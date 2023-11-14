import React from "react";
import { Navigate } from "react-router-dom";
import Header from "../components/Header";

const Thread = () => {
  return (
    <div className={`bg-main-low min-w-screen min-h-screen bg-fixed bg-cover `}>
      <div id="container">
        {sessionStorage.getItem("isAuth") === "true" ? (
          <>
            <Header />
          </>
        ) : (
          <Navigate to="/sign" />
        )}
      </div>
    </div>
  );
};

export default Thread;
