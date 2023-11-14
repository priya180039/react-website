import React, { useEffect, useState } from "react";
import { getRepliesByUser } from "../api/Api";
import { Link } from "react-router-dom";

const DashboardReplies = (props) => {
  const [replies, setReplies] = useState([]);
  const [showReplies, setShowReplies] = useState(false);
  const [changeBtn, setChangeBtn] = useState(false);

  useEffect(() => {
    getRepliesByUser().then((res) => {
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
    });
    if (props.changeSection !== "reply") {
      setShowReplies(false);
    }
  }, [props]);

  return (
    <div className="relative w-[calc(98.75%)] mx-auto md:ml-2 lg:mx-2 xl:mx-2 z-0">
      <div className="bg-gray-200 rounded-es-md rounded-ee-md px-2 py-2">
        <div className="w-full border-2 rounded-md border-zinc-950/90">
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
                  <li className="w-[5%] border-r-2 border-gray-400 py-2">No</li>
                  <li className="w-[20%] border-r-2 border-gray-400 py-2">
                    Created At
                  </li>
                  <li className="w-[30%] border-r-2 border-gray-400 py-2">
                    Reply
                  </li>
                  <li className="w-[30%] border-r-2 border-gray-400 py-2">
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
                    <li className="w-[5%] max-w-[5%] text-center border-zinc-950/20 border-r-2 border-t-2 py-2">
                      {i + 1}
                    </li>
                    <li className="w-[20%] max-w-[20%] px-1 border-zinc-950/20 border-r-2 border-t-2 py-2">
                      {reply.createdAt}
                    </li>
                    <li className="w-[30%] max-w-[30%] px-1 border-zinc-950/20 border-r-2 border-t-2 py-2">
                      {reply.reply}
                    </li>
                    <li className="w-[30%] max-w-[30%] whitespace-nowrap overflow-ellipsis overflow-hidden px-1 border-zinc-950/20 border-r-2 border-t-2 py-2">
                      {reply.thread.title}
                    </li>
                    <li className="w-[15%] max-w-[15%] text-center border-zinc-950/20 border-t-2 py-2">
                      Action
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
