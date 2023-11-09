import React, { useEffect, useState } from "react";
import { useSign } from "../features/SignContext";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const RegisterForm = () => {
  const [inputFirst, setInputFirst] = useState("");
  const [inputLast, setInputLast] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [inputConfirmPassword, setInputConfirmPassword] = useState("");
  const [errFirst, setErrFirst] = useState("");
  const [errLast, setErrLast] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [errConfirmPassword, setErrConfirmPassword] = useState("");
  const { isSuccess, isError, message } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { signIn } = useSign();

  useEffect(() => {
    if (isSuccess) {
      localStorage.setItem("isAuth", true);
      navigate("/");
      setErrEmail("");
      setErrPassword("");
      setInputEmail("");
      setInputPassword("");
    }
    if (isError) {
      setErrEmail("");
      setErrPassword(message);
    }
  }, [isSuccess, isError, message, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      inputFirst.length < 3 ||
      inputFirst.length > 100 ||
      inputLast.length < 3 ||
      inputLast.length > 100 ||
      inputEmail.length === 0 ||
      inputPassword.length === 0 ||
      inputConfirmPassword.length === 0
    ) {
      if (inputFirst.length < 3) {
        setErrFirst("Minimal 3 huruf!");
      } else if (inputFirst.length > 100) {
        setErrFirst("Maksimal 100 huruf!");
      }
      if (inputLast.length < 3) {
        setErrLast("Minimal 3 huruf!");
      } else if (inputLast.length > 100) {
        setErrLast("Maksimal 100 huruf!");
      }
      if (inputEmail.length === 0) {
        setErrEmail("Tidak boleh kosong!");
      }
      if (inputPassword.length === 0) {
        setErrPassword("Tidak boleh kosong!");
      }
      if (inputConfirmPassword.length === 0) {
        setErrConfirmPassword("Tidak boleh kosong!");
      }
      return;
    }
    // try {
    //   dispatch(LoginUser({ inputEmail, inputPassword }));
    // } catch (error) {
    //   console.log(error);
    // }
  };
  return (
    <div className="w-1/2 m-auto h-screen flex flex-col items-center">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col w-full items-center pt-2 px-4 text-xl font-exo text-green-500 font-bold my-auto"
      >
        <div className="text-center my-4 text-4xl">
          <p className="mix-blend-hard-light">Register</p>
        </div>
        <div className="w-[calc(83.333333%+1rem)] flex flex-col">
          <div className="w-full inline-block">
            <label htmlFor="firstname" className="mix-blend-hard-light">
              Firstname
            </label>
            <span
              className={`text-red-700 text-lg font-lora mix-blend-hard-light ml-4 ${
                errFirst ? "opacity-100" : "opacity-0"
              }`}
            >
              {errFirst}
            </span>
          </div>
          <input
            id="firstname"
            onChange={(e) => {
              setInputFirst(e.target.value);
            }}
            value={inputFirst}
            className="text-zinc-950 font-light font-lora w-full mix-blend-lighten py-2 rounded-md"
          />
        </div>
        <div className="w-[calc(83.333333%+1rem)] flex flex-col">
          <div className="w-full inline-block">
            <label htmlFor="lastname" className="mix-blend-hard-light">
              Lastname
            </label>
            <span
              className={`text-red-700 text-lg font-lora mix-blend-hard-light ml-4 ${
                errLast ? "opacity-100" : "opacity-0"
              }`}
            >
              {errLast}
            </span>
          </div>
          <input
            id="lastname"
            onChange={(e) => {
              setInputLast(e.target.value);
            }}
            value={inputLast}
            className="text-zinc-950 font-light font-lora w-full mix-blend-lighten py-2 rounded-md"
          />
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
            }}
            value={inputEmail}
            className="text-zinc-950 font-light font-lora w-full mix-blend-lighten py-2 rounded-md"
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
            className="text-zinc-950 font-light w-full mix-blend-lighten py-2 rounded-md"
          />
        </div>
        <div className="w-[calc(83.333333%+1rem)] flex flex-col">
          <div className="w-full inline-block">
            <label htmlFor="confpassword" className="mix-blend-hard-light">
              Confirm Password
            </label>
            <span
              className={`text-red-700 text-lg font-lora mix-blend-hard-light ml-4 ${
                errConfirmPassword ? "opacity-100" : "opacity-0"
              }`}
            >
              {errConfirmPassword}
            </span>
          </div>
          <input
            id="confpassword"
            type="password"
            onChange={(e) => {
              setInputConfirmPassword(e.target.value);
              console.warn("password received");
            }}
            value={inputConfirmPassword}
            className="text-zinc-950 font-light w-full mix-blend-lighten py-2 rounded-md"
          />
        </div>
        <div className="w-[calc(83.333333%+1rem)] flex flex-col">
          <button
            id="submit"
            type="submit"
            className="w-full bg-green-500 text-gray-200 mix-blend-hard-light py-2 mt-3 rounded-md"
          >
            Login
          </button>
        </div>
        <div className="w-[calc(83.333333%+1rem)] flex">
          <p className="mr-2">Already have an account?</p>
          <button onClick={() => signIn()} className="text-gray-300">
            Login now!
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
