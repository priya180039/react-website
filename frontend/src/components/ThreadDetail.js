import React, { useEffect, useState } from "react";
import {
  addReply,
  deletePost,
  deleteReply,
  editReply,
  getAuth,
  getRepliesByThread,
  getThreadById,
  updatePost,
} from "../api/Api";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  BiArrowBack,
  BiCheck,
  BiEdit,
  BiSend,
  BiTrash,
  BiX,
} from "react-icons/bi";

const ThreadDetail = () => {
  const [countErrorImageThread, setCountErrorImageThread] = useState(0);
  const [countErrorImageReplies, setCountErrorImageReplies] = useState(0);
  const [userData, setUserData] = useState(null);
  const [thread, setThread] = useState({});
  const [replies, setReplies] = useState([]);
  const [editPost, setEditPost] = useState(false);
  const [editReplyIndex, setEditReplyIndex] = useState(-1);
  const [showReplies, setShowReplies] = useState(false);
  const [inputEditTitle, setInputEditTitle] = useState("");
  const [inputEditPost, setInputEditPost] = useState("");
  const [inputEditReply, setInputEditReply] = useState("");
  const [inputAddReply, setInputAddReply] = useState("");
  const [isUpdate, setUpdated] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getAuth().then((response) => {
      if (response) setUserData(response.data);
    });
    getThreadById(id)
      .then((response) => {
        if (response) {
          const dataDate = new Date(response.data.createdAt);
          const dd = dataDate.getDate().toString().padStart(2, "0");
          const mm = (dataDate.getMonth() + 1).toString().padStart(2, "0");
          const yyyy = dataDate.getFullYear();
          const hours = dataDate.getHours().toString().padStart(2, "0");
          const minutes = dataDate.getMinutes().toString().padStart(2, "0");
          const seconds = dataDate.getSeconds().toString().padStart(2, "0");

          const formattedDate = `${dd}-${mm}-${yyyy} ${hours}:${minutes}:${seconds}`;
          setThread({ ...response.data, createdAt: formattedDate });
          getRepliesByThread(response.data.uuid).then((rep) => {
            if (rep) setReplies(rep.data);
          });
        }
      })
      .catch((err) => navigate(-1));
    setUpdated(false);
  }, [id, isUpdate, navigate]);

  return (
    <div className="relative w-full justify-center mx-auto md:mr-2 lg:mr-2 z-0">
      <div className="bg-gray-200 rounded-md my-2 mt-[3.85rem] md:mt-[4.25rem] lg:mt-[4.25rem] xl:mt-[4.25rem]">
        {userData && thread.user && replies && (
          <>
            <div className="flex flex-1 bg-gray-200 rounded-md justify-between p-4">
              <div className="w-full transform transition-all duration-300 ease-in-out">
                <div className="flex justify-between items-center">
                  <p
                    className={`rounded-lg text-sm md:text-base lg:text-base xl:text-base`}
                  >
                    {"Post created at " + thread.createdAt}
                  </p>
                  <p
                    onClick={() => {
                      let solved;
                      if (thread.solved === "0") {
                        solved = false;
                      } else {
                        solved = true;
                      }
                      updatePost(thread.uuid, {
                        tags: [],
                        solved: !solved,
                      }).then(() => setUpdated(true));
                    }}
                    className={`text-sm md:text-base lg:text-base xl:text-base
                  ${
                    thread.user.uuid === userData.user.uuid
                      ? thread.solved === "0"
                        ? "text-red-700 hover:text-red-500 hover:cursor-pointer"
                        : "text-green-700 hover:text-green-500 hover:cursor-pointer"
                      : thread.solved === "0"
                      ? "text-red-700 pointer-events-none"
                      : "text-green-700 pointer-events-none"
                  }
                    `}
                  >
                    {thread.solved === "0"
                      ? "Still unsolved"
                      : "Already solved"}
                  </p>
                </div>
                <div className="flex mb-4 w-[calc(100%)] border-[1px] border-zinc-950/40"></div>
                <div className="mb-2 mt-2 w-full">
                  <div className="flex mb-2 mt-2 text-sm md:text-base lg:text-base xl:text-base">
                    <div className="w-3/12 sm:w-2/12 md:w-2/12 lg:w-2/12 xl:w-2/12 text-center">
                      <p
                        className={`w-[calc(80%-1rem)] mx-auto lg:mr-auto xl:mr-auto ${
                          thread.user.role === "expert"
                            ? "bg-zinc-950/90"
                            : "bg-sky-500"
                        } text-gray-200 rounded-lg shadow-xl`}
                      >
                        {thread.user.role}
                      </p>
                    </div>
                    <div className="flex justify-between w-9/12 sm:w-10/12 md:w-10/12 lg:w-10/12 xl:w-10/12">
                      <div
                        className={`w-fit text-gray-200 rounded-md px-2 mb-3 ${
                          thread.user.role === "expert"
                            ? "bg-zinc-950/90"
                            : "bg-sky-500"
                        }`}
                      >
                        <p className="shadow-md">{thread.user.name}</p>
                      </div>
                      {thread.user.uuid === userData.user.uuid && (
                        <div className="max-w-[25%]">
                          {editPost ? (
                            <div className="text-2xl flex scale-125 justify-end">
                              <BiX
                                className="hover:cursor-pointer text-red-700 hover:text-red-500"
                                onClick={() => {
                                  setEditPost(false);
                                  setInputEditTitle("");
                                  setInputEditPost("");
                                }}
                              />
                              <BiCheck
                                onClick={() => {
                                  updatePost(thread.uuid, {
                                    title: inputEditTitle,
                                    content: inputEditPost,
                                    tags: [],
                                  }).then(() => {
                                    setUpdated(true);
                                    setEditPost(false);
                                    setInputEditTitle("");
                                    setInputEditPost("");
                                  });
                                }}
                                className={`${
                                  !inputEditPost || !inputEditTitle
                                    ? "pointer-events-none hover:cursor-not-allowed text-gray-600"
                                    : "hover:cursor-pointer text-green-700 hover:text-green-500"
                                }`}
                              />
                            </div>
                          ) : (
                            <div className="text-2xl flex justify-end">
                              <BiTrash
                                onClick={() => {
                                  setUpdated(true);
                                  deletePost(thread.uuid).then(() =>
                                    navigate(-1)
                                  );
                                }}
                                className="hover:cursor-pointer text-red-700 hover:text-red-500"
                              />
                              <BiEdit
                                className="hover:cursor-pointer text-sky-700 hover:text-sky-500"
                                onClick={() => {
                                  setEditPost(true);
                                  setInputEditTitle(thread.title);
                                  setInputEditPost(thread.content);
                                }}
                              />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex w-full  lg:w-full md:w-full justify-between">
                  <div className="w-3/12 sm:w-2/12 md:w-2/12 lg:w-2/12 xl:w-2/12">
                    <div className="xl:w-[calc(80%-1rem)] lg:w-[calc(90%-1rem)] md:w-[calc(85%-1rem)] sm:w-[calc(80%-1rem)] w-[calc(80%-1rem)] mx-auto lg:mr-auto xl:mr-auto rounded-full overflow-hidden shadow-xl">
                      <img
                        className="w-full"
                        src={`https://picsum.photos/id/${
                          230 + thread.user.id
                        }/300`}
                        onError={(e) => {
                          if (countErrorImageThread < 1) {
                            e.target.src = `https://picsum.photos/id/${
                              230 + thread.user.id + 100
                            }/300`;
                            setCountErrorImageThread(countErrorImageThread + 1);
                          } else {
                            console.log("Network Error");
                          }
                        }}
                        alt="profile"
                      />
                    </div>
                  </div>
                  {editPost ? (
                    <div className="w-9/12 sm:w-10/12 md:w-10/12 lg:w-10/12 xl:w-10/12">
                      <input
                        onChange={(e) => setInputEditTitle(e.target.value)}
                        value={inputEditTitle}
                        className="w-fit rounded-md mb-4 px-2 py-1 shadow-lg border-2 border-zinc-950/90 bg-gray-200"
                      />

                      <input
                        onChange={(e) => setInputEditPost(e.target.value)}
                        value={inputEditPost}
                        className="w-full rounded-md my-2 px-2 py-1 shadow-xl border-2 border-zinc-950/90 bg-gray-200"
                      />
                    </div>
                  ) : (
                    <div className="w-9/12 sm:w-10/12 md:w-10/12 lg:w-10/12 xl:w-10/12">
                      <p className="w-fit rounded-md mb-4 px-2 py-1 shadow-lg bg-gray-300">
                        {thread.title}
                      </p>
                      <p className="w-full rounded-md my-2 px-2 py-1 shadow-xl bg-gray-300">
                        {thread.content}
                      </p>
                    </div>
                  )}
                </div>
                <div className="w-full mt-4 flex justify-between">
                  <div></div>
                  <div className="w-9/12 sm:w-10/12 md:w-10/12 lg:w-10/12 xl:w-10/12 border-[1px] border-zinc-950/40 flex justify-between"></div>
                </div>
                <div className="flex mt-4 w-full justify-end">
                  <Link
                    onClick={() => setShowReplies(!showReplies)}
                    className="bg-zinc-950/90 border-2 border-transparent text-gray-200 hover:border-zinc-950/90 hover:bg-gray-200 hover:text-zinc-950/90 shadow-xl text-center w-9/12 sm:w-10/12 md:w-10/12 lg:w-10/12 xl:w-10/12 p-2 rounded-md"
                  >
                    {showReplies ? "Close replies" : "Show replies"}
                  </Link>
                </div>
                {replies.map((reply, index) => {
                  return (
                    <div
                      key={reply.uuid}
                      className={`w-full flex flex-col items-end mt-4 transform transition-all duration-300 ease-in-out ${
                        showReplies
                          ? "translate-y-0 h-fit opacity-100"
                          : "-translate-y-[30%] h-0 opacity-0 overflow-hidden"
                      }`}
                    >
                      <div className="flex w-9/12 sm:w-10/12 md:w-10/12 lg:w-10/12 xl:w-10/12 justify-between">
                        <div className="w-3/12 sm:w-2/12 md:w-2/12 lg:w-2/12 xl:w-2/12">
                          <div className="w-[calc(100%-1rem)] sm:w-[calc(80%-1rem)] md:w-[calc(80%-1rem)] lg:w-[calc(90%-1rem)] xl:w-[calc(80%-1rem)] mx-auto lg:mr-auto xl:mr-auto rounded-full overflow-hidden shadow-xl">
                            <img
                              className="w-full"
                              src={`https://picsum.photos/id/${
                                230 + reply.user.id
                              }/300`}
                              onError={(e) => {
                                if (countErrorImageReplies < 1) {
                                  e.target.src = `https://picsum.photos/id/${
                                    230 + reply.user.id + 100
                                  }/300`;
                                  setCountErrorImageReplies(
                                    countErrorImageReplies + 1
                                  );
                                } else {
                                  console.log("Network Error");
                                }
                              }}
                              alt="profile"
                            />
                          </div>
                        </div>
                        <div className="w-9/12 sm:w-10/12 md:w-10/12 lg:w-10/12 xl:w-10/12">
                          <div className="rounded-md flex justify-between w-full">
                            <p
                              className={`px-3 ${
                                reply.user.role === "expert"
                                  ? "bg-zinc-950/90"
                                  : "bg-sky-500"
                              } text-gray-200 rounded-lg`}
                            >
                              {reply.user.name}
                            </p>
                            {userData.user.uuid === reply.user.uuid &&
                              (editReplyIndex === index ? (
                                <div className="text-2xl flex scale-125 justify-end">
                                  <BiX
                                    className="hover:cursor-pointer text-red-700 hover:text-red-500"
                                    onClick={() => {
                                      setEditReplyIndex(-1);
                                    }}
                                  />
                                  <BiCheck
                                    onClick={() =>
                                      editReply(reply.uuid, {
                                        threadId: reply.threadId,
                                        reply: inputEditReply,
                                      }).then((response) => {
                                        setUpdated(true);
                                        setEditReplyIndex(-1);
                                      })
                                    }
                                    className="hover:cursor-pointer text-green-700 hover:text-green-500"
                                  />
                                </div>
                              ) : (
                                <div className="text-2xl flex justify-end">
                                  <BiTrash
                                    onClick={() => {
                                      setUpdated(true);
                                      deleteReply(reply.uuid);
                                    }}
                                    className="hover:cursor-pointer text-red-700 hover:text-red-500"
                                  />
                                  <BiEdit
                                    className="hover:cursor-pointer text-sky-700 hover:text-sky-500"
                                    onClick={() => {
                                      setEditReplyIndex(index);
                                      setInputEditReply(reply.reply);
                                    }}
                                  />
                                </div>
                              ))}
                          </div>
                          {editReplyIndex === index ? (
                            <input
                              onChange={(e) =>
                                setInputEditReply(e.target.value)
                              }
                              className="rounded-md w-full my-3 px-2 py-1 shadow-xl bg-gray-300 focus:bg-gray-200"
                              value={inputEditReply}
                            />
                          ) : (
                            <div className="rounded-md w-full my-3 px-2 py-1 shadow-xl bg-gray-300">
                              {reply.reply}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div
                  className={`flex justify-between items-center ${
                    showReplies && "mt-2"
                  }`}
                >
                  <div
                    onClick={() => navigate(-1)}
                    className="flex w-fit justify-start items-center text-zinc-950/90 hover:text-sky-500 hover:cursor-pointer"
                  >
                    <BiArrowBack className="text-3xl md:text-3xl lg:text-4xl xl:text-4xl" />
                    <p className="hidden md:block lg:block xl:block text-xl">
                      Back
                    </p>
                  </div>
                  {userData.user.role === "expert" ? (
                    <div
                      className={`flex w-[83.25%] justify-end items-center ${
                        showReplies && "mt-2"
                      }`}
                    >
                      <div className="w-full flex justify-end">
                        <input
                          onChange={(e) => setInputAddReply(e.target.value)}
                          value={inputAddReply}
                          placeholder="Add reply..."
                          className={`bg-gray-300 w-full focus:bg-gray-200 border-2 border-transparent text-zinc-950/90 shadow-xl py-1 px-2 rounded-md`}
                        />
                        <div className="w-[5%] xl:mr-1.5 lg:mr-1.5 md:mr-1.5 sm:mr-3 mr-5 lg:w-[5%] xl:w-[5%] text-center">
                          <BiSend
                            onClick={() =>
                              addReply({
                                threadId: thread.id,
                                reply: inputAddReply,
                              }).then(() => {
                                setUpdated(true);
                                setInputAddReply("");
                              })
                            }
                            className="text-4xl mx-auto text-zinc-950/90 hover:text-sky-500 hover:cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex w-[calc(91.666667%-1rem)] justify-end items-center">
                      <div className="w-full flex justify-end">
                        <p className="text-xl mx-auto text-zinc-950/60">
                          Only experts can reply
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ThreadDetail;
