import React, { useEffect, useState } from "react";
import { getThreads } from "../api/Api";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    getThreads().then((response) => {
      setThreads(response.data);
    });
  }, []);

  const allTags = threads.reduce((all, thread) => {
    return [...all, ...thread.tags];
  }, []);
  const tags = Array.from(new Set(allTags));

  return (
    <div
      className={`top-[3.25rem] md:top-0 lg:top-0 xl:top-0 absolute md:relative lg:relative xl:relative md:overflow-y-auto lg:overflow-y-auto xl:overflow-y-auto md:block lg:block w-full lg:w-2/12 xl:w-2/12 md:w-full z-10`}
    >
      <ul
        className={`bg-gray-200 flex flex-col items-center gap-2 h-screen md:h-fit lg:h-fit xl:h-fit md:mt-[4.25rem] lg:mt-[4.25rem] xl:mt-[4.25rem] rounded-md py-2 text-3xl md:text-sm lg:text-base xl:text-base `}
      >
        <li className="w-11/12 border-2 px-1 transform transition-all duration-100 ease-in-out hover:bg-zinc-950/90 hover:border-transparent hover:text-gray-200 hover:cursor-pointer rounded-lg border-zinc-950/90">
          <Link>all</Link>
        </li>
        {tags &&
          tags.map((tag) => {
            return (
              <li
                key={tag}
                className="w-11/12 border-2 px-1 transform transition-all duration-100 ease-in-out hover:bg-zinc-950/90 hover:border-transparent hover:text-gray-200 hover:cursor-pointer rounded-lg border-zinc-950/90"
              >
                <Link>{tag}</Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default Sidebar;
