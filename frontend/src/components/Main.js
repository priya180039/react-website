import React, { useEffect, useState } from "react";
import { getThreads } from "../api/Api";

const Main = () => {
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    getThreads().then((response) => {
      setThreads(response.data);
    });
  }, []);

  return (
    <div className="lg:w-[calc(58.333333% - 1rem)] mx-2 lg:mt-[3.75rem] xl:mt-[3.75rem] md:w-full z-0">
      {threads.map((thread) => {
        return (
          <div
            key={thread.uuid}
            className="flex flex-1 bg-gray-200 rounded-md py-4 pr-5 lg:pr-7 xl:pr-7 md:pr-6 mt-2 justify-between mb-2"
          >
            <div className="flex w-full lg:w-full md:w-full justify-between transform transition-all duration-300 ease-in-out hover:scale-105">
              <div className="w-3/12 sm:w-2/12 md:w-2/12 lg:w-2/12 xl:w-2/12">
                <div className="w-[6rem] sm:w-[4.5rem] lg:w-[5.25rem] md:w-[6rem] xl:w-[6.5rem] mx-auto md lg:mr-auto xl:mr-auto rounded-full overflow-hidden shadow-xl">
                  <img
                    className="w-full"
                    src={`https://picsum.photos/id/23${thread.user.id}/100`}
                    alt="profile"
                  />
                </div>
              </div>
              <div className="w-9/12 sm:w-10/12 md:w-10/12 lg:w-10/12 xl:w-10/12 rounded-md p-2 shadow-xl bg-gray-300">
                <p className="w-full">{thread.title}</p>
                <p className="w-full">{thread.content}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Main;
