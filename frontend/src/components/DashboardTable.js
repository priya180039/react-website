import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getThreadsByUser } from "../api/Api";

const DashboardTable = () => {
  const [threads, setThreads] = useState([]);
  useEffect(() => {
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
      console.log(threads);
    });
  }, []);

  return (
    <div className="relative w-[calc(98.75%)] mx-auto md:ml-2 lg:mx-2 xl:mx-2 z-0">
      <div className="bg-gray-200 rounded-md mt-[4rem] px-2 md:mt-[4.25rem] lg:mt-[4.25rem] xl:mt-[4.25rem] py-2">
        <div className="w-full border-2 rounded-md border-zinc-950/90">
          <div className="flex flex-col flex-1 w-full bg-zinc-700 text-gray-200">
            <ul className="flex text-center flex-1 justify-between">
              <li className="w-[3%] border-r-2 border-gray-400 py-2">No</li>
              <li className="w-[17%] border-r-2 border-gray-400 py-2">
                Created At
              </li>
              <li className="w-[18%] border-r-2 border-gray-400 py-2">Title</li>
              <li className="w-[21%] border-r-2 border-gray-400 py-2">
                Content
              </li>
              <li className="w-[15%] border-r-2 border-gray-400 py-2">Tags</li>
              <li className="w-[6%] border-r-2 border-gray-400 py-2">
                Replies
              </li>
              <li className="w-[10%] border-r-2 border-gray-400 py-2">
                Status
              </li>
              <li className="w-[10%] py-2">Action</li>
            </ul>
          </div>
          {threads &&
            threads.map((thread, i) => {
              return (
                <div key={thread.uuid} className="flex flex-col flex-1 w-full">
                  <ul className="flex flex-1 justify-between">
                    <li className="w-[3%] max-w-[3%] text-center border-zinc-950/20 border-r-2 border-t-2 py-2">
                      {i + 1}
                    </li>
                    <li className="w-[17%] max-w-[17%] px-1 border-zinc-950/20 border-r-2 border-t-2 py-2">
                      {thread.createdAt}
                    </li>
                    <li className="w-[18%] max-w-[18%] px-1 border-zinc-950/20 border-r-2 border-t-2 py-2">
                      {thread.title}
                    </li>
                    <li className="w-[21%] max-w-[21%] whitespace-nowrap overflow-ellipsis overflow-hidden px-1 border-zinc-950/20 border-r-2 border-t-2 py-2">
                      {thread.content}
                    </li>
                    <li className="w-[15%] max-w-[15%] px-1 border-zinc-950/20 border-r-2 border-t-2 py-2">
                      {thread.tags.join(", ")}
                    </li>
                    <li className="w-[6%] max-w-[6%] text-center border-zinc-950/20 border-r-2 border-t-2 py-2">
                      Replies
                    </li>
                    <li className="w-[10%] max-w-[10%] text-center border-zinc-950/20 border-r-2 border-t-2 py-2">
                      {thread.solved === "0" ? "Unsolved" : "Solved"}
                    </li>
                    <li className="w-[10%] max-w-[10%] text-center border-zinc-950/20 border-t-2 py-2">
                      Action
                    </li>
                  </ul>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default DashboardTable;
