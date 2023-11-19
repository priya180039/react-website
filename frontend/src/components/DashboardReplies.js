import React, { useEffect, useState } from "react";
import { deleteReply, getRepliesByUser } from "../api/Api";
import { Link, useNavigate } from "react-router-dom";

const DashboardReplies = (props) => {
  const [replies, setReplies] = useState([]);
  const [showReplies, setShowReplies] = useState(false);
  const [changeBtn, setChangeBtn] = useState(false);
  const [isUpdate, setUpdated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getRepliesByUser().then((res) => {
      if (res) {
        const format = res.data.map((reply) => {
          const dataDate = new Date(reply.createdAt);
          const dd = dataDate.getDate().toString().padStart(2, "0");
          const mm = (dataDate.getMonth() + 1).toString().padStart(2, "0");
          const yyyy = dataDate.getFullYear();
          const hours = dataDate.getHours().toString().padStart(2, "0");
          const minutes = dataDate.getMinutes().toString().padStart(2, "0");
          const seconds = dataDate.getSeconds().toString().padStart(2, "0");

          const formattedDate = `${dd}-${mm}-${yyyy} ${hours}:${minutes}:${seconds}`;
          return { ...reply, createdAt: formattedDate };
        });
        setReplies(format);
      }
    });
    if (props.changeSection !== "reply") {
      setShowReplies(false);
    }
    setUpdated(false);
  }, [props, isUpdate]);

  return (
    <div className="relative w-[calc(98.75%)] mx-auto md:ml-2 lg:mx-2 xl:mx-2 z-0">
      <div className="bg-gray-200 overflow-auto rounded-es-md rounded-ee-md px-2 py-2">
        <div
          className={`md:w-full lg:w-full xl:w-full border-2 rounded-md text-sm md:text-base lg:text-base xl:text-base border-zinc-950/90 ${
            showReplies && "w-[160%]"
          }`}
        >
          {showReplies ? (
            <div
              onMouseOver={() => setChangeBtn(true)}
              onMouseLeave={() => setChangeBtn(false)}
              className="flex flex-col flex-1 w-full hover:cursor-pointer hover:bg-gray-200 hover:text-zinc-950/90 bg-zinc-700 text-gray-200 transform transition-all duration-200 ease-in-out"
            >
              {changeBtn ? (
                <Link
                  onClick={() => setShowReplies(false)}
                  className="py-2 text-center hover:bg-gray-200 hover:text-zinc-950/90 transform transition-all duration-300 ease-in-out"
                >
                  Close Replies
                </Link>
              ) : (
                <ul className="flex text-center flex-1 justify-between transform transition-all duration-300 ease-in-out">
                  <li className="w-[4%] border-r-2 border-gray-400 py-2">No</li>
                  <li className="w-[14%] border-r-2 border-gray-400 py-2">
                    Created At
                  </li>
                  <li className="w-[30%] border-r-2 border-gray-400 py-2">
                    Reply
                  </li>
                  <li className="w-[37%] border-r-2 border-gray-400 py-2">
                    Thread Title
                  </li>
                  <li className="w-[15%] py-2">Action</li>
                </ul>
              )}
            </div>
          ) : (
            <div className="flex flex-col flex-1 w-full bg-zinc-700 text-gray-200 transform transition-all duration-300 ease-in-out">
              <Link
                onClick={() => {
                  setShowReplies(true);
                  props.setChangeSection("reply");
                }}
                className="py-2 text-center hover:bg-gray-200 hover:text-zinc-950/90"
              >
                Show Replies
              </Link>
            </div>
          )}
          {showReplies &&
            replies &&
            replies &&
            replies.map((reply, i) => {
              return (
                <div
                  onMouseOver={() => setChangeBtn(false)}
                  key={reply.uuid}
                  className="flex flex-col flex-1 w-full"
                >
                  <ul className="flex flex-1 justify-between">
                    <li className="w-[4%] max-w-[4%] text-center border-zinc-950/20 border-r-2 border-t-2 py-2">
                      {i + 1}
                    </li>
                    <li className="w-[14%] max-w-[14%] px-1 border-zinc-950/20 border-r-2 border-t-2 py-2">
                      {reply.createdAt}
                    </li>
                    <li className="w-[30%] max-w-[30%] whitespace-nowrap overflow-ellipsis overflow-hidden px-1 border-zinc-950/20 border-r-2 border-t-2 py-2">
                      {reply.reply}
                    </li>
                    <li className="w-[37%] max-w-[37%] px-1 border-zinc-950/20 border-r-2 border-t-2 py-2">
                      {reply.thread.title}
                    </li>
                    <li className="w-[15%] max-w-[15%] text-center border-zinc-950/20 border-t-2 py-2">
                      <button
                        onClick={() => navigate(`/thread/${reply.thread.uuid}`)}
                        className="bg-sky-700 w-3/4 mb-2 text-gray-200 hover:bg-sky-500 rounded-md"
                      >
                        To Post
                      </button>
                      <button
                        onClick={() => {
                          setUpdated(true);
                          deleteReply(reply.uuid);
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
      {showReplies && replies.length < 1 && (
        <div
          onMouseOver={() => setChangeBtn(false)}
          className="flex flex-col text-gray-200 flex-1 w-full h-[50vh] text-3xl justify-center text-center"
        >
          <p>Tidak ada reply</p>
        </div>
      )}
    </div>
  );
};

export default DashboardReplies;
