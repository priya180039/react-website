import React, { useEffect, useState } from "react";
import { deletePost, getAuth, getReplies, getThreadsByUser } from "../api/Api";
import { Link, useNavigate } from "react-router-dom";

const DashboardTable = (props) => {
  const [userData, setUserData] = useState(null);
  const [threads, setThreads] = useState([]);
  const [replies, setReplies] = useState([]);
  const [showThreads, setShowThreads] = useState(false);
  const [changeBtn, setChangeBtn] = useState(false);
  const [isUpdate, setUpdated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getAuth().then((response) => {
      setUserData(response.data);
    });
    getThreadsByUser().then((res) => {
      const format = res.data.map((thread) => {
        const dataDate = new Date(thread.createdAt);
        const dd = dataDate.getDate().toString().padStart(2, "0");
        const mm = (dataDate.getMonth() + 1).toString().padStart(2, "0");
        const yyyy = dataDate.getFullYear();
        const hours = dataDate.getHours().toString().padStart(2, "0");
        const minutes = dataDate.getMinutes().toString().padStart(2, "0");
        const seconds = dataDate.getSeconds().toString().padStart(2, "0");

        const formattedDate = `${dd}-${mm}-${yyyy} ${hours}:${minutes}:${seconds}`;
        return { ...thread, createdAt: formattedDate };
      });
      setThreads(format);
    });
    getReplies().then((response) => {
      setReplies(response.data);
    });
    if (props.changeSection !== "thread") {
      setShowThreads(false);
    }
    setUpdated(false);
  }, [props, isUpdate]);

  return (
    <div className="relative w-[calc(98.75%)] mx-auto md:ml-2 lg:mx-2 xl:mx-2 z-0">
      <div
        className={`bg-gray-200 overflow-auto mt-[4rem] px-2 md:mt-[4.25rem] lg:mt-[4.25rem] xl:mt-[4.25rem] py-2 ${
          userData &&
          (userData.user.role === "expert"
            ? "rounded-ss-md rounded-se-md"
            : "rounded-md")
        }`}
      >
        <div
          className={`md:w-full lg:w-full xl:w-full border-2 rounded-md text-sm md:text-base lg:text-base xl:text-base border-zinc-950/90 ${
            showThreads && "w-[180%]"
          }`}
        >
          {showThreads ? (
            <div
              onMouseOver={() => setChangeBtn(true)}
              onMouseLeave={() => setChangeBtn(false)}
              className="flex flex-col flex-1 w-full hover:cursor-pointer hover:bg-gray-200 hover:text-zinc-950/90 bg-zinc-700 text-gray-200 transform transition-all duration-200 ease-in-out"
            >
              {changeBtn ? (
                <Link
                  onClick={() => setShowThreads(false)}
                  className="py-2 text-center hover:bg-gray-200 hover:text-zinc-950/90 transform transition-all duration-300 ease-in-out"
                >
                  Close Threads
                </Link>
              ) : (
                <ul className="flex text-center flex-1 justify-between transform transition-all duration-300 ease-in-out">
                  <li className="w-[4%] border-r-2 border-gray-400 py-2">No</li>
                  <li className="w-[14%] border-r-2 border-gray-400 py-2">
                    Created At
                  </li>
                  <li className="w-[18%] border-r-2 border-gray-400 py-2">
                    Title
                  </li>
                  <li className="w-[17%] border-r-2 border-gray-400 py-2">
                    Content
                  </li>
                  <li className="w-[17%] border-r-2 border-gray-400 py-2">
                    Tags
                  </li>
                  <li className="w-[9%] border-r-2 border-gray-400 py-2">
                    Replies
                  </li>
                  <li className="w-[11%] border-r-2 border-gray-400 py-2">
                    Status
                  </li>
                  <li className="w-[10%] py-2">Action</li>
                </ul>
              )}
            </div>
          ) : (
            <div className="flex flex-col flex-1 w-full bg-zinc-700 text-gray-200 transform transition-all duration-300 ease-in-out">
              <Link
                onClick={() => {
                  setShowThreads(true);
                  props.setChangeSection("thread");
                }}
                className="py-2 text-center hover:bg-gray-200 hover:text-zinc-950/90"
              >
                Show Threads
              </Link>
            </div>
          )}
          {showThreads &&
            threads &&
            replies &&
            threads.map((thread, i) => {
              return (
                <div key={thread.uuid} className="flex flex-col flex-1 w-full">
                  <ul className="flex flex-1 justify-between">
                    <li className="w-[4%] max-w-[4%] text-center border-zinc-950/20 border-r-2 border-t-2 py-2">
                      {i + 1}
                    </li>
                    <li className="w-[14%] max-w-[14%] px-1 border-zinc-950/20 border-r-2 border-t-2 py-2">
                      {thread.createdAt}
                    </li>
                    <li className="w-[18%] max-w-[18%] px-1 border-zinc-950/20 border-r-2 border-t-2 py-2">
                      {thread.title}
                    </li>
                    <li className="w-[17%] max-w-[17%] whitespace-nowrap overflow-ellipsis overflow-hidden px-1 border-zinc-950/20 border-r-2 border-t-2 py-2">
                      {thread.content}
                    </li>
                    <li className="w-[17%] max-w-[17%] whitespace-nowrap overflow-ellipsis overflow-hidden px-1 border-zinc-950/20 border-r-2 border-t-2 py-2">
                      {thread.tags.join(", ")}
                    </li>
                    <li className="w-[9%] max-w-[9%] text-center border-zinc-950/20 border-r-2 border-t-2 py-2">
                      {
                        replies.filter((reply) => reply.thread.id === thread.id)
                          .length
                      }
                    </li>
                    <li className="w-[11%] max-w-[11%] text-center border-zinc-950/20 border-r-2 border-t-2 py-2">
                      {thread.solved === "0" ? "Unsolved" : "Solved"}
                    </li>
                    <li className="w-[10%] max-w-[10%] text-center border-zinc-950/20 border-t-2 py-2">
                      <button
                        onClick={() => navigate(`/thread/${thread.uuid}`)}
                        className="bg-sky-700 w-3/4 mb-2 text-gray-200 hover:bg-sky-500 rounded-md"
                      >
                        To Post
                      </button>
                      <button
                        onClick={() => {
                          setUpdated(true);
                          deletePost(thread.uuid);
                        }}
                        className="bg-red-700 w-3/4 text-gray-200 hover:bg-red-500 rounded-md"
                      >
                        Delete
                      </button>
                    </li>
                  </ul>
                </div>
              );
            })}
        </div>
      </div>
      {showThreads && threads.length < 1 && (
        <div className="flex flex-col text-gray-200 flex-1 w-full h-[50vh] text-3xl justify-center text-center">
          <p>Tidak ada thread</p>
        </div>
      )}
    </div>
  );
};

export default DashboardTable;
