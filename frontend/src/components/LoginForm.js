import React, { useEffect, useState } from "react";
import { LoginUser, reset } from "../features/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useSign } from "../features/SignContext";

const LoginForm = () => {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isSuccess, isError, isLoading, message } = useSelector(
    (state) => state.auth
  );
  const { signUp } = useSign();

  useEffect(() => {
    if (isSuccess) {
      console.log(isSuccess);
      sessionStorage.setItem("isAuth", true);
      sessionStorage.setItem("activeTab", "home");
      navigate("/");
      setInputEmail("");
      setInputPassword("");
    }
    if (isError) {
      if (message === "User tidak ditemukan") {
        setErrEmail(message);
      } else {
        setErrPassword(message);
      }
    }
    dispatch(reset());
  }, [isSuccess, isError, message, navigate, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrEmail("");
    setErrPassword("");
    if (inputEmail.length === 0 || inputPassword.length === 0) {
      if (inputEmail.length === 0) {
        setErrEmail("Tidak boleh kosong!");
      } else {
        if (!/\S+@\S+\.\S+/.test(e.target.value)) {
          setErrEmail("Email tidak valid");
        } else setErrEmail("");
      }
      if (inputPassword.length === 0) {
        setErrPassword("Tidak boleh kosong!");
      } else {
        setErrPassword("");
      }
      return;
    }
    dispatch(LoginUser({ inputEmail, inputPassword }));
  };

  return (
    <div className="w-11/12 md:w-8/12 lg:w-7/12 xl:w-1/2 m-auto h-screen flex flex-col items-center">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col w-full items-center pt-2 px-4 xl:text-xl lg:text-xl md:text-xl text-sm font-exo text-green-500 font-bold my-auto"
      >
        <div className="text-center my-4 text-4xl">
          <p className="mix-blend-hard-light">Login</p>
        </div>
        <div className="w-[calc(83.333333%+1rem)] flex flex-col">
          <div className="w-full flex">
            <div
              className={`text-red-500 text-sm md:text-lg lg:text-lg xl:text-lg font-lora mix-blend-hard-light ${
                errEmail ? "opacity-100" : "opacity-0"
              }`}
            >
              {errEmail}
            </div>
            <div>&nbsp;</div>
          </div>
          <input
            id="email"
            onChange={(e) => {
              setInputEmail(e.target.value);
              console.log(inputEmail);
            }}
            placeholder="Your email"
            value={inputEmail}
            className={`text-zinc-950 font-light border-2 bg-gray-300 focus:bg-gray-100 font-lora w-full mix-blend-lighten py-2 px-3 rounded-md ${
              errEmail ? "border-red-500 bg-red-200" : "border-green-500"
            }`}
          />
        </div>
        <div className="w-[calc(83.333333%+1rem)] flex flex-col">
          <div className="w-full flex">
            <div
              className={`text-red-500 text-sm md:text-lg lg:text-lg xl:text-lg font-lora mix-blend-hard-light ${
                errPassword ? "opacity-100" : "opacity-0"
              }`}
            >
              {errPassword}
            </div>
            <div>&nbsp;</div>
          </div>
          <input
            id="password"
            type="password"
            onChange={(e) => {
              setInputPassword(e.target.value);
              console.warn("password received");
            }}
            placeholder="Your password"
            value={inputPassword}
            className={`text-zinc-950 font-light border-2 bg-gray-300 focus:bg-gray-100 w-full mix-blend-lighten py-2 px-3 rounded-md ${
              errPassword ? "border-red-500 bg-red-200" : "border-green-500"
            }`}
          />
        </div>
        <div className="w-[calc(83.333333%+1rem)] flex flex-col">
          {isLoading ? (
            <button
              disabled
              id="submit"
              type="submit"
              className="w-full transform transition-all duration-300 ease-in-out bg-gray-200 text-zinc-950/90 border-2 border-transparent mix-blend-hard-light py-2 mt-[30px] rounded-md"
            >
              Loading...
            </button>
          ) : (
            <button
              id="submit"
              type="submit"
              className="w-full transform transition-all duration-300 ease-in-out bg-green-500 text-gray-200 hover:bg-gray-200 hover:text-zinc-950/90 border-2 border-transparent hover:border-zinc-950/90 mix-blend-hard-light py-2 mt-[30px] rounded-md"
            >
              Login
            </button>
          )}
        </div>
        <div className="w-[calc(83.333333%+1rem)] flex text-gray-300 transform transition-all duration-200 ease-in-out">
          <p className="mr-2">Don't have an account yet?</p>
          <Link
            onClick={() => {
              signUp();
              setErrEmail("");
              setErrPassword("");
              setInputEmail("");
              setInputPassword("");
            }}
            className="hover:text-green-500"
          >
            Join us!
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
