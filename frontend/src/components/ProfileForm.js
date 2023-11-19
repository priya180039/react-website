import React, { useEffect, useState } from "react";
import { getAuth, updateUser } from "../api/Api";
import { BiCheck, BiEdit, BiMessageX, BiX } from "react-icons/bi";

const ProfileForm = (props) => {
  const [inputFirst, setInputFirst] = useState("");
  const [inputLast, setInputLast] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("password");
  const [inputConfirmPassword, setInputConfirmPassword] = useState("");
  const [editFirst, setEditFirst] = useState(false);
  const [editLast, setEditLast] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  const [errFirst, setErrFirst] = useState("");
  const [errLast, setErrLast] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [errConfirmPassword, setErrConfirmPassword] = useState("");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    getAuth().then((response) => {
      if (response) {
        setUserData(response.data);
        if (!editFirst && !editLast && !editEmail) {
          setInputFirst(response.data.user.firstName);
          setInputLast(response.data.user.lastName);
          setInputEmail(response.data.user.email);
        }
      }
    });
  }, [editFirst, editLast, editEmail, editPassword]);

  return (
    <div className="relative w-[calc(100%-1rem)] sm:w-[calc(100%-1rem)] md:w-[calc(66.666667%-.5rem)] lg:w-[calc(75%-.5rem)] xl:w-[calc(75%-.5rem)] mx-auto md:mr-2 lg:mr-2 xl:mr-2 z-0">
      {userData && (
        <div className="bg-gray-200 rounded-md my-2 md:mt-[4.25rem] lg:mt-[4.25rem] xl:mt-[4.25rem] py-4">
          <form className="flex flex-col w-full items-center pt-2 px-4 text-xl font-exo text-zinc-950/90 font-bold my-auto">
            {/* Field Firstname */}
            <div className="w-[calc(83.333333%+1rem)] flex flex-col">
              <div className="w-full flex items-center justify-between mb-1">
                <label htmlFor="firstname">Firstname</label>
                {editFirst ? (
                  <div className="text-2xl flex scale-125">
                    <BiX
                      className="hover:cursor-pointer text-red-700 hover:text-red-500"
                      onClick={() => {
                        setEditFirst(false);
                        setInputFirst(userData.user.firstName);
                        setErrFirst("");
                      }}
                    />
                    <BiCheck
                      onClick={() => {
                        inputFirst.length < 3
                          ? setErrFirst("Minimal 3 huruf")
                          : inputFirst.length > 100
                          ? setErrFirst("Maksimal 100 huruf")
                          : updateUser(userData.user.uuid, {
                              firstName: inputFirst,
                              password: "",
                              confPassword: "",
                            })
                              .then(() => {
                                setEditFirst(false);
                                setErrFirst("");
                                props.setUpdate(true);
                              })
                              .then();
                      }}
                      className="hover:cursor-pointer text-green-700 hover:text-green-500"
                    />
                  </div>
                ) : (
                  <div className="text-2xl">
                    <BiEdit
                      className="hover:cursor-pointer text-sky-700 hover:text-sky-500"
                      onClick={() => {
                        setEditFirst(true);
                      }}
                    />
                  </div>
                )}
              </div>
              <input
                type="text"
                id="firstname"
                onChange={(e) => {
                  setInputFirst(e.target.value);
                }}
                value={inputFirst}
                disabled={!editFirst}
                className={`text-zinc-950 font-light font-lora w-full px-3 rounded-md shadow-xl md:py-1 lg:py-2 xl:py-2 ${
                  editFirst ? "bg-gray-50" : "bg-gray-300 hover:cursor-default"
                }`}
              />
              <div
                className={`text-red-600 flex text-sm font-exo ${
                  errFirst ? "opacity-100" : "opacity-100"
                }`}
              >
                <p>{errFirst}</p>
                <BiMessageX className="opacity-0 text-xl my-auto text-black overflow-hidden" />
              </div>
            </div>

            {/* Field Lastname */}
            <div className="w-[calc(83.333333%+1rem)] flex flex-col">
              <div className="w-full flex items-center justify-between mb-1">
                <label htmlFor="lastname">Lastname</label>
                {editLast ? (
                  <div className="text-2xl flex scale-125">
                    <BiX
                      className="hover:cursor-pointer text-red-700 hover:text-red-500"
                      onClick={() => {
                        setEditLast(false);
                        setInputLast(userData.user.lastName);
                        setErrLast("");
                      }}
                    />
                    <BiCheck
                      onClick={() =>
                        inputLast.length < 3
                          ? setErrLast("Minimal 3 huruf")
                          : inputLast.length > 100
                          ? setErrLast("Maksimal 100 huruf")
                          : updateUser(userData.user.uuid, {
                              lastName: inputLast,
                              password: "",
                              confPassword: "",
                            }).then(() => {
                              setEditLast(false);
                              setErrLast("");
                              props.setUpdate(true);
                            })
                      }
                      className="hover:cursor-pointer text-green-700 hover:text-green-500"
                    />
                  </div>
                ) : (
                  <div className="text-2xl">
                    <BiEdit
                      className="hover:cursor-pointer text-sky-700 hover:text-sky-500"
                      onClick={() => {
                        setEditLast(true);
                      }}
                    />
                  </div>
                )}
              </div>
              <input
                id="lastname"
                type="text"
                onChange={(e) => {
                  setInputLast(e.target.value);
                }}
                value={inputLast}
                disabled={!editLast}
                className={`text-zinc-950 font-light font-lora w-full px-3 rounded-md shadow-xl md:py-1 lg:py-2 xl:py-2 ${
                  editLast ? "bg-gray-50" : "bg-gray-300 hover:cursor-default"
                }`}
              />
              <div
                className={`text-red-600 flex text-sm font-exo ${
                  errLast ? "opacity-100" : "opacity-100"
                }`}
              >
                <p>{errLast}</p>
                <BiMessageX className="opacity-0 text-xl my-auto text-black overflow-hidden" />
              </div>
            </div>

            {/* Field Email */}
            <div className="w-[calc(83.333333%+1rem)] flex flex-col">
              <div className="w-full flex items-center justify-between mb-1">
                <label htmlFor="email">Email</label>
                {editEmail ? (
                  <div className="text-2xl flex scale-125">
                    <BiX
                      className="hover:cursor-pointer text-red-700 hover:text-red-500"
                      onClick={() => {
                        setEditEmail(false);
                        setInputEmail(userData.user.email);
                        setErrEmail("");
                      }}
                    />
                    <BiCheck
                      onClick={
                        () => {
                          updateUser(userData.user.uuid, {
                            email: inputEmail,
                            password: "",
                            confPassword: "",
                          })
                            .then((res) => {
                              if (res.data.message) {
                                setEditEmail(false);
                                setErrEmail("");
                              }
                            })
                            .catch((err) => {
                              setErrEmail("Email tidak valid");
                            });
                        }
                        // Validation error: Validation isEmail on email failed
                      }
                      className="hover:cursor-pointer text-green-700 hover:text-green-500"
                    />
                  </div>
                ) : (
                  <div className="text-2xl">
                    <BiEdit
                      className="hover:cursor-pointer text-sky-700 hover:text-sky-500"
                      onClick={() => {
                        setEditEmail(true);
                      }}
                    />
                  </div>
                )}
              </div>
              <input
                id="email"
                type="email"
                autoComplete="email"
                onChange={(e) => {
                  setInputEmail(e.target.value);
                }}
                value={inputEmail}
                disabled={!editEmail}
                className={`text-zinc-950 font-light font-lora w-full px-3 rounded-md shadow-xl md:py-1 lg:py-2 xl:py-2 ${
                  editEmail ? "bg-gray-50" : "bg-gray-300 hover:cursor-default"
                }`}
              />
              <div
                className={`text-red-600 flex text-sm font-exo ${
                  errEmail ? "opacity-100" : "opacity-100"
                }`}
              >
                <p>{errEmail}</p>
                <BiMessageX className="opacity-0 text-xl my-auto text-black overflow-hidden" />
              </div>
            </div>

            {/* Field Password */}
            <div className="w-[calc(83.333333%+1rem)] flex flex-col">
              <div className="w-full flex items-center justify-between mb-1">
                <label htmlFor="password">Password</label>
                <div className="text-2xl">
                  {!editPassword && (
                    <BiEdit
                      className="hover:cursor-pointer text-sky-700 hover:text-sky-500"
                      onClick={() => {
                        setInputPassword("");
                        setEditPassword(true);
                      }}
                    />
                  )}
                </div>
              </div>
              <input
                id="password"
                type="password"
                onChange={(e) => {
                  setInputPassword(e.target.value);
                }}
                value={inputPassword}
                disabled={!editPassword}
                className={`text-zinc-950 font-light font-lora w-full px-3 rounded-md shadow-xl md:py-1 lg:py-2 xl:py-2 ${
                  editPassword
                    ? "bg-gray-50"
                    : "bg-gray-300 hover:cursor-default"
                }`}
              />
              <div
                className={`text-red-600 flex text-sm font-exo ${
                  errPassword ? "opacity-100" : "opacity-100"
                }`}
              >
                <p>{errPassword}</p>
                <BiMessageX className="opacity-0 text-xl my-auto text-black overflow-hidden" />
              </div>
            </div>

            {/* Field Confirm Password (Hanya muncul jika sedang edit password) */}
            {editPassword && (
              <>
                <div className="w-[calc(83.333333%+1rem)] flex flex-col">
                  <div className="w-full flex items-center justify-between mb-1">
                    <label htmlFor="confpassword">Confirm Password</label>
                  </div>
                  <input
                    id="confpassword"
                    type="password"
                    onChange={(e) => {
                      setInputConfirmPassword(e.target.value);
                    }}
                    value={inputConfirmPassword}
                    disabled={!editPassword}
                    className={`text-zinc-950 font-light font-lora w-full px-3 rounded-md shadow-xl md:py-1 lg:py-2 xl:py-2 ${
                      editPassword
                        ? "bg-gray-50"
                        : "bg-gray-300 hover:cursor-default"
                    }`}
                  />
                  <div
                    className={`text-red-600 flex text-sm font-exo ${
                      errConfirmPassword ? "opacity-100" : "opacity-100"
                    }`}
                  >
                    <p>{errConfirmPassword}</p>
                    <BiMessageX className="opacity-0 text-xl my-auto text-black overflow-hidden" />
                  </div>
                </div>
                <div className="w-[calc(83.333333%+1rem)] flex flex-col">
                  <div className="w-full flex items-center text-5xl justify-center mb-1">
                    <BiX
                      className="hover:cursor-pointer text-red-700 hover:text-red-500"
                      onClick={() => {
                        setEditPassword(false);
                        setErrPassword("");
                        setErrConfirmPassword("");
                        setInputPassword("password");
                      }}
                    />
                    <BiCheck
                      onClick={() => {
                        if (inputPassword.length < 8) {
                          setErrPassword("Minimal 8 karakter");
                          setErrConfirmPassword("Minimal 8 karakter");
                        } else if (inputPassword !== inputConfirmPassword) {
                          setErrPassword(
                            "Password & Confirm Password harus sama"
                          );
                          setErrConfirmPassword(
                            "Password & Confirm Password harus sama"
                          );
                        } else {
                          updateUser(userData.user.uuid, {
                            password: inputPassword,
                            confPassword: inputConfirmPassword,
                          }).then((res) => {
                            if (res.data.message) {
                              setEditPassword(false);
                              setErrPassword("");
                              setErrConfirmPassword("");
                              setInputPassword("password");
                            }
                          });
                        }
                      }}
                      className="hover:cursor-pointer text-green-700 hover:text-green-500"
                    />
                  </div>
                </div>
              </>
            )}
          </form>
        </div>
      )}
    </div>
  );
};

export default ProfileForm;
