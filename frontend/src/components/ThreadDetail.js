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
      setUserData(response.data);
    });
    getThreadById(id)
      .then((response) => {
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
          setReplies(rep.data);
        });
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
                  <p className={`rounded-lg`}>
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
                    className={`
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
                <div className="flex mb-3 mt-2 w-full justify-between items-center">
                  <div className="flex mb-1 text-base sm:text-lg md:text-xl lg:text-xl xl:text-xl justify-start w-full md:w-full lg:w-9/12 xl:w-9/12">
                    <div className="flex justify-start items-center w-[17.3%] sm:w-[17%] lg:w-[22.5%] xl:w-[22.5%] text-center">
                      <p
                        className={`w-[3.5rem] sm:w-[4.5rem] lg:w-[6rem] md:w-[7rem] xl:w-[6rem] ${
                          thread.user.role === "expert"
                            ? "bg-zinc-950/90"
                            : "bg-sky-500"
                        } text-gray-200 rounded-lg pb-1`}
                      >
                        {thread.user.role}
                      </p>
                    </div>
                    <div className="flex w-[77.5%]">
                      <p
                        className={`rounded-lg text-gray-200 px-4 pb-1  ${
                          thread.user.role === "expert"
                            ? "bg-zinc-950/90"
                            : "bg-sky-500"
                        }`}
                      >
                        {thread.user.name}
                      </p>
                    </div>
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
                              deletePost(thread.uuid).then(() => navigate(-1));
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
                <div className="w-full flex justify-center">
                  <div className="w-fit h-fit flex justify-end mr-auto">
                    <div className="w-[3.5rem] sm:w-[4.5rem] lg:w-[6rem] md:w-[7rem] xl:w-[6rem] mx-auto lg:mr-auto xl:mr-auto rounded-full overflow-hidden shadow-xl">
                      <img
                        className="w-full"
                        src={`https://picsum.photos/id/${
                          230 + thread.user.id
                        }/300`}
                        onError={(e) =>
                          (e.target.src = `https://picsum.photos/id/${
                            230 + thread.user.id + 100
                          }/300`)
                        }
                        alt="profile"
                      />
                    </div>
                  </div>
                  {editPost ? (
                    <div className="w-[83.25%] flex flex-col justify-between">
                      <input
                        onChange={(e) => setInputEditTitle(e.target.value)}
                        value={inputEditTitle}
                        className="w-fit rounded-md mb-2 px-2 py-1 shadow-lg border-2 border-zinc-950/90 bg-gray-200"
                      />

                      <input
                        onChange={(e) => setInputEditPost(e.target.value)}
                        value={inputEditPost}
                        className="w-full rounded-md my-2 px-2 py-1 shadow-xl border-2 border-zinc-950/90 bg-gray-200"
                      />
                    </div>
                  ) : (
                    <div className="w-[83.25%] flex flex-col justify-between">
                      <p className="w-fit rounded-md mb-2 px-2 py-1 shadow-lg bg-gray-300">
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
                  <div className="w-[83.25%] border-[1px] border-zinc-950/40 flex justify-between"></div>
                </div>
                <div className="flex mt-4 w-full justify-end">
                  <Link
                    onClick={() => setShowReplies(!showReplies)}
                    className="bg-zinc-950/90 border-2 border-transparent text-gray-200 hover:border-zinc-950/90 hover:bg-gray-200 hover:text-zinc-950/90 shadow-xl text-center w-[83.25%] p-2 rounded-md"
                  >
                    {showReplies ? "Close replies" : "Show replies"}
                  </Link>
                </div>
                {replies.map((reply, index) => {
                  return (
                    <div
                      key={reply.uuid}
                      className={`w-full mt-4 flex justify-end transform transition-all duration-300 ease-in-out ${
                        showReplies
                          ? "translate-y-0 h-fit opacity-100"
                          : "-translate-y-[30%] h-0 opacity-0 overflow-hidden"
                      }`}
                    >
                      <div className="w-[83.25%] md:w-[83.25%] lg:w-[83.25%] xl:w-[83.25%] flex justify-between">
                        <div className="w-1/12 flex flex-col items-start">
                          <div className="w-[2.75rem] sm:w-[3rem] lg:w-[4rem] md:w-[4.5rem] xl:w-[4rem] mx-auto lg:mx-auto xl:mr-auto lg:ml-0 xl:ml-0 rounded-full overflow-hidden shadow-xl">
                            <img
                              className="w-full"
                              src={`https://picsum.photos/id/${
                                230 + reply.user.id
                              }/300`}
                              onError={(e) =>
                                (e.target.src = `https://picsum.photos/id/${
                                  230 + reply.user.id + 100
                                }/300`)
                              }
                              alt="profile"
                            />
                          </div>
                        </div>
                        <div className="w-[calc(90%-1rem)] md:w-[calc(90%-1rem)] lg:w-[calc(91.666667%-1rem)] xl:w-[calc(91.666667%-1rem)]">
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
