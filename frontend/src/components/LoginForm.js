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
      navigate("/");
      setInputEmail("");
      setInputPassword("");
    }
    if (isError) {
      setErrPassword(message);
    }
    dispatch(reset());
  }, [isSuccess, isError, message, navigate, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputEmail.length === 0 || inputPassword.length === 0) {
      if (inputEmail.length === 0) {
        setErrEmail("Tidak boleh kosong!");
      } else {
        setErrEmail("");
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
    <div className="w-1/2 m-auto h-screen flex flex-col items-center">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col w-full items-center pt-2 px-4 text-xl font-exo text-green-500 font-bold my-auto"
      >
        <div className="text-center my-4 text-4xl">
          <p className="mix-blend-hard-light">Login</p>
        </div>
        <div className="w-[calc(83.333333%+1rem)] flex flex-col">
          <div className="w-full inline-block">
            <label htmlFor="email" className="mix-blend-hard-light">
              Email
            </label>
            <span
              className={`text-red-700 text-lg font-lora mix-blend-hard-light ml-4 ${
                errEmail ? "opacity-100" : "opacity-0"
              }`}
            >
              {errEmail}
            </span>
          </div>
          <input
            id="email"
            onChange={(e) => {
              setInputEmail(e.target.value);
              console.log(inputEmail);
            }}
            value={inputEmail}
            className="text-zinc-950 font-light font-lora w-full mix-blend-lighten py-2 px-3 rounded-md"
          />
        </div>
        <div className="w-[calc(83.333333%+1rem)] flex flex-col">
          <div className="w-full inline-block">
            <label htmlFor="password" className="mix-blend-hard-light">
              Password
            </label>
            <span
              className={`text-red-700 text-lg font-lora mix-blend-hard-light ml-4 ${
                errPassword ? "opacity-100" : "opacity-0"
              }`}
            >
              {errPassword}
            </span>
          </div>
          <input
            id="password"
            type="password"
            onChange={(e) => {
              setInputPassword(e.target.value);
              console.warn("password received");
            }}
            value={inputPassword}
            className="text-zinc-950 font-light w-full mix-blend-lighten py-2 px-3 rounded-md"
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
          <Link onClick={() => signUp()} className="hover:text-green-500">
            Join us!
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
