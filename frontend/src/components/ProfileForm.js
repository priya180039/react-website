import React, { useState } from "react";

const ProfileForm = () => {
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

  return (
    <div className="relative w-8/12 sm:w-2/12 md:w-2/12 lg:w-2/12 xl:w-[calc(75%-.5rem)] mr-2 z-0">
      <div className="bg-gray-200 rounded-md md:mt-[2.75rem] lg:mt-[2.75rem] xl:mt-[2.75rem] py-4">
        <form className="flex flex-col w-full items-center pt-2 px-4 text-xl font-exo text-green-500 font-bold my-auto">
          <div className="text-center my-4 text-4xl">
            <p className="">Register</p>
          </div>
          <div className="w-[calc(83.333333%+1rem)] flex flex-col">
            <div className="w-full inline-block">
              <label htmlFor="registfirstname" className="">
                Firstname
              </label>
              <span
                className={`text-red-700 text-lg font-lora  ml-4 ${
                  errFirst ? "opacity-100" : "opacity-0"
                }`}
              >
                {errFirst}
              </span>
            </div>
            <input
              id="registfirstname"
              onChange={(e) => {
                setInputFirst(e.target.value);
              }}
              value={inputFirst}
              className="text-zinc-950 font-light font-lora w-full  py-2 rounded-md"
            />
          </div>
          <div className="w-[calc(83.333333%+1rem)] flex flex-col">
            <div className="w-full inline-block">
              <label htmlFor="registlastname" className="">
                Lastname
              </label>
              <span
                className={`text-red-700 text-lg font-lora  ml-4 ${
                  errLast ? "opacity-100" : "opacity-0"
                }`}
              >
                {errLast}
              </span>
            </div>
            <input
              id="registlastname"
              onChange={(e) => {
                setInputLast(e.target.value);
              }}
              value={inputLast}
              className="text-zinc-950 font-light font-lora w-full  py-2 rounded-md"
            />
          </div>
          <div className="w-[calc(83.333333%+1rem)] flex flex-col">
            <div className="w-full inline-block">
              <label htmlFor="registemail" className="">
                Email
              </label>
              <span
                className={`text-red-700 text-lg font-lora  ml-4 ${
                  errEmail ? "opacity-100" : "opacity-0"
                }`}
              >
                {errEmail}
              </span>
            </div>
            <input
              id="registemail"
              onChange={(e) => {
                setInputEmail(e.target.value);
              }}
              value={inputEmail}
              className="text-zinc-950 font-light font-lora w-full  py-2 rounded-md"
            />
          </div>
          <div className="w-[calc(83.333333%+1rem)] flex flex-col">
            <div className="w-full inline-block">
              <label htmlFor="registpassword" className="">
                Password
              </label>
              <span
                className={`text-red-700 text-lg font-lora  ml-4 ${
                  errPassword ? "opacity-100" : "opacity-0"
                }`}
              >
                {errPassword}
              </span>
            </div>
            <input
              id="registpassword"
              type="password"
              onChange={(e) => {
                setInputPassword(e.target.value);
                console.warn("password received");
              }}
              value={inputPassword}
              className="text-zinc-950 font-light w-full  py-2 rounded-md"
            />
          </div>
          <div className="w-[calc(83.333333%+1rem)] flex flex-col">
            <div className="w-full inline-block">
              <label htmlFor="registconfpassword" className="">
                Confirm Password
              </label>
              <span
                className={`text-red-700 text-lg font-lora  ml-4 ${
                  errConfirmPassword ? "opacity-100" : "opacity-0"
                }`}
              >
                {errConfirmPassword}
              </span>
            </div>
            <input
              id="registconfpassword"
              type="password"
              onChange={(e) => {
                setInputConfirmPassword(e.target.value);
                console.warn("password received");
              }}
              value={inputConfirmPassword}
              className="text-zinc-950 font-light w-full  py-2 rounded-md"
            />
          </div>
          <div className="w-[calc(83.333333%+1rem)] flex flex-col">
            <button
              id="register"
              type="submit"
              className="w-full bg-green-500 text-gray-200  py-2 mt-3 rounded-md"
            >
              Register
            </button>
          </div>
          <div className="w-[calc(83.333333%+1rem)] flex">
            <p className="mr-2">Already have an account?</p>
            <button className="text-gray-300">Login now!</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;
