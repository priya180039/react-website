import React from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import { Navigate } from "react-router-dom";
import { useSign } from "../features/SignContext";

const LandingForm = () => {
  const { signType } = useSign();
  return (
    <>
      {sessionStorage.getItem("isAuth") === "true" ? (
        <Navigate to="/" />
      ) : (
        <>
          <div className="relative h-screen w-screen bg-fixed bg-cover">
            <div className="bg-landing absolute inset-0 bg-fixed bg-cover brightness-[.4]"></div>
            <div
              className={`transform transition-all duration-500 ease-in-out ${
                signType === "login"
                  ? "translate-x-0"
                  : "translate-x-full opacity-0 hidden"
              }`}
            >
              <LoginForm />
            </div>
            <div
              className={`transform transition-all duration-500 ease-in-out ${
                signType === "register"
                  ? "translate-x-0"
                  : "translate-x-full opacity-0 hidden"
              }`}
            >
              <RegisterForm />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default LandingForm;
