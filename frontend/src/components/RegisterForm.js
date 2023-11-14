import React, { useEffect, useState } from "react";
import { useSign } from "../features/SignContext";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api/Api";

const RegisterForm = () => {
  const [inputFirst, setInputFirst] = useState("");
  const [inputLast, setInputLast] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [inputConfirmPassword, setInputConfirmPassword] = useState("");
  const [inputRole, setInputRole] = useState("");
  const [errFirst, setErrFirst] = useState("");
  const [errLast, setErrLast] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [errConfirmPassword, setErrConfirmPassword] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [err, setErr] = useState(false);
  const navigate = useNavigate();
  const { signIn } = useSign();
  let done = false;

  useEffect(() => {
    if (
      inputFirst.length === 0 ||
      inputLast.length === 0 ||
      inputEmail.length === 0 ||
      inputPassword.length === 0 ||
      inputConfirmPassword.length === 0 ||
      inputRole === ""
    ) {
      setDisabled(true);
    }
    if (err) {
      setDisabled(true);
    }
  }, [
    err,
    disabled,
    inputFirst,
    inputLast,
    inputEmail,
    inputPassword,
    inputConfirmPassword,
    inputRole,
  ]);

  const validate = (val, field) => {
    if (field === "password") {
      if (val.length < 8) {
        setErr(true);
        setErrPassword("Password minimal 8 karakter");
      } else {
        setErr(false);
        setDisabled(false);
        done = true;
        setErrPassword("");
      }
      if (done) {
        if (inputConfirmPassword !== val) {
          setErr(true);
          setErrConfirmPassword("Confirm Password tidak cocok");
        } else {
          setErr(false);
          setErrConfirmPassword("");
        }
      }
    }
    if (field === "confirmpassword") {
      if (inputPassword !== val) {
        setErr(true);
        setErrConfirmPassword("Confirm Password tidak cocok");
      } else {
        setErr(false);
        setDisabled(false);
        setErrConfirmPassword("");
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser({
      firstName: inputFirst,
      lastName: inputLast,
      email: inputEmail,
      password: inputPassword,
      confPassword: inputConfirmPassword,
      role: inputRole,
    });
    navigate("/sign");
    signIn();
    alert("Berhasil daftar akun");
    setErrFirst("");
    setErrLast("");
    setErrEmail("");
    setErrPassword("");
    setErrConfirmPassword("");
    setInputFirst("");
    setInputLast("");
    setInputEmail("");
    setInputPassword("");
    setInputConfirmPassword("");
    setInputRole("");
  };
  return (
    <div className="w-11/12 md:w-8/12 lg:w-7/12 xl:w-1/2 m-auto h-screen flex flex-col items-center">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col w-full items-center pb-2 pt-1 px-4 xl:text-xl lg:text-xl md:text-xl text-sm font-exo text-green-500 font-bold my-auto"
      >
        <div className="text-center my-auto text-4xl">
          <p className="mix-blend-hard-light">Register</p>
        </div>
        <div className="w-[calc(83.333333%+1rem)] flex flex-col">
          <div className="w-full flex">
            <div
              className={`text-red-500 text-sm md:text-lg lg:text-lg font-lora mix-blend-hard-light ${
                errFirst ? "opacity-100" : "opacity-0"
              }`}
            >
              {errFirst}
            </div>
            <div>&nbsp;</div>
          </div>
          <input
            id="registfirstname"
            onChange={(e) => {
              setInputFirst(e.target.value);
              if (e.target.value.length < 3) {
                setErr(true);
                setErrFirst("Minimal 3 huruf!");
              } else if (e.target.value.length > 100) {
                setErr(true);
                setErrFirst("Maksimal 100 huruf!");
              } else {
                setErrFirst("");
                setErr(false);
                setDisabled(false);
              }
            }}
            placeholder="Your firstname"
            value={inputFirst}
            className={`text-zinc-950 font-light font-lora w-full border-2 bg-gray-300 focus:bg-gray-100 mix-blend-lighten py-2 px-3 rounded-md ${
              errFirst ? "border-red-500 bg-red-200" : "border-green-500"
            }`}
          />
        </div>
        <div className="w-[calc(83.333333%+1rem)] flex flex-col">
          <div className="w-full flex">
            <div
              className={`text-red-500 text-sm md:text-lg lg:text-lg font-lora mix-blend-hard-light ${
                errLast ? "opacity-100" : "opacity-0"
              }`}
            >
              {errLast}
            </div>
            <div>&nbsp;</div>
          </div>
          <input
            id="registlastname"
            onChange={(e) => {
              setInputLast(e.target.value);
              console.log(e.target.value);
              if (e.target.value.length < 3) {
                setErr(true);
                setErrLast("Minimal 3 huruf!");
              } else if (e.target.value.length > 100) {
                setErr(true);
                setErrLast("Maksimal 100 huruf!");
              } else {
                setErrLast("");
                setErr(false);
                setDisabled(false);
              }
            }}
            placeholder="Your lastname"
            value={inputLast}
            className={`text-zinc-950 font-light font-lora border-2 bg-gray-300 focus:bg-gray-100 w-full mix-blend-lighten py-2 px-3 rounded-md ${
              errLast ? "border-red-500 bg-red-200" : "border-green-500"
            }`}
          />
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
            id="registemail"
            onChange={(e) => {
              setInputEmail(e.target.value);
              if (!/\S+@\S+\.\S+/.test(e.target.value)) {
                setErrEmail("Email tidak valid");
                setErr(true);
              } else {
                setErrEmail("");
                setErr(false);
                setDisabled(false);
              }
            }}
            placeholder="Your email"
            value={inputEmail}
            className={`text-zinc-950 font-light font-lora border-2 bg-gray-300 focus:bg-gray-100 w-full mix-blend-lighten py-2 px-3 rounded-md ${
              errEmail ? "border-red-500 bg-red-200" : "border-green-500"
            }`}
          />
        </div>
        <div className="w-[calc(83.333333%+1rem)] flex flex-col">
          <div className="w-full flex">
            <div
              className={`text-red-500 text-sm md:text-lg lg:text-lg font-lora mix-blend-hard-light ${
                errPassword ? "opacity-100" : "opacity-0"
              }`}
            >
              {errPassword}
            </div>
            <div>&nbsp;</div>
          </div>
          <input
            id="registpassword"
            type="password"
            onChange={(e) => {
              setInputPassword(e.target.value);
              validate(e.target.value, "password");
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
          <div className="w-full flex">
            <div
              className={`text-red-500 text-sm md:text-lg lg:text-lg font-lora mix-blend-hard-light ${
                errConfirmPassword ? "opacity-100" : "opacity-0"
              }`}
            >
              {errConfirmPassword}
            </div>
            <div>&nbsp;</div>
          </div>
          <input
            id="registconfpassword"
            type="password"
            onChange={(e) => {
              setInputConfirmPassword(e.target.value);
              validate(e.target.value, "confirmpassword");
              console.warn("password received");
            }}
            placeholder="Match with your password"
            value={inputConfirmPassword}
            className={`text-zinc-950 font-light border-2 bg-gray-300 focus:bg-gray-100 w-full mix-blend-lighten py-2 px-3 rounded-md ${
              errConfirmPassword
                ? "border-red-500 bg-red-200"
                : "border-green-500"
            }`}
          />
        </div>
        <div className="w-[calc(83.333333%+1rem)] flex flex-col">
          <div className="w-full flex">
            <div>&nbsp;</div>
          </div>
          <select
            id="registrole"
            type="select"
            onChange={(e) => {
              setInputRole(e.target.value);
              setDisabled(false);
            }}
            value={inputRole}
            className={`text-zinc-950 font-light border-2 bg-gray-300 focus:bg-gray-100 w-full mix-blend-lighten py-2 px-3 rounded-md`}
          >
            <option value="" disabled>
              Role
            </option>
            <option value="learner">Learner</option>
            <option value="expert">Expert</option>
          </select>
        </div>
        <div className="w-[calc(83.333333%+1rem)] flex flex-col">
          <div className="w-full flex">
            <div>&nbsp;</div>
          </div>
          <button
            disabled={disabled}
            id="register"
            type="submit"
            className="w-full transform transition-all duration-300 ease-in-out bg-green-500 text-gray-200 hover:bg-gray-200 hover:text-zinc-950/90 border-2 border-transparent hover:border-zinc-950/90 mix-blend-hard-light py-2 disabled:bg-gray-400 disabled:text-zinc-950/90 disabled:hover:cursor-not-allowed disabled:hover:border-transparent rounded-md"
          >
            Register
          </button>
        </div>
        <div className="w-[calc(83.333333%+1rem)] flex text-gray-300 transform transition-all duration-200 ease-in-out">
          <p className="mr-2">Already have an account?</p>
          <Link
            onClick={() => {
              signIn();
              setErrFirst("");
              setErrLast("");
              setErrEmail("");
              setErrPassword("");
              setErrConfirmPassword("");
              setInputFirst("");
              setInputLast("");
              setInputEmail("");
              setInputPassword("");
              setInputConfirmPassword("");
              setInputRole("");
            }}
            className="hover:text-green-500"
          >
            Login now!
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
