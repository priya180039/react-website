import React, { useEffect, useState } from "react";
import { getThreads } from "../api/Api";
import { Link } from "react-router-dom";
import { useFilter } from "../features/FilterContext";
import { useHeader } from "../features/HeaderContext";

const Sidebar = () => {
  const [threads, setThreads] = useState([]);
  const { activeFilter, setActiveFilter } = useFilter();
  const { setSideToggle } = useHeader();

  useEffect(() => {
    getThreads().then((response) => {
      setThreads(response.data);
    });
  }, [activeFilter]);

  const handleClick = (e) => {
    e.preventDefault();
    setActiveFilter(e.target.textContent);
    setSideToggle(false);
  };

  const allTags = threads.reduce((all, thread) => {
    return [...all, ...thread.tags];
  }, []);
  const tags = Array.from(new Set(allTags));

  return (
    <div
      className={`top-[3.25rem] md:top-0 lg:top-0 xl:top-0 absolute md:relative lg:relative xl:relative md:overflow-y-auto lg:overflow-y-auto xl:overflow-y-auto md:block lg:block w-full lg:w-3/12 xl:w-2/12 md:w-full z-10`}
    >
      <div
        className={`max-h-[calc(100vh-3.25rem)] md:max-h-[calc(100vh-.5rem)] lg:max-h-[calc(100vh-.5rem)] xl:max-h-[calc(100vh-.75rem)] overflow-auto md:overflow-auto lg:overflow-auto xl:overflow-auto`}
      >
        <ul
          className={`bg-gray-200 flex flex-col items-center gap-2 md:h-fit lg:h-fit xl:h-fit md:mt-[4.25rem] lg:mt-[4.25rem] xl:mt-[4.25rem] rounded-md py-2 text-3xl md:text-sm lg:text-base xl:text-base `}
        >
          <li
            onClick={(e) => handleClick(e)}
            className={`w-11/12 border-2 px-1 transform transition-all duration-100 ease-in-out hover:bg-zinc-950/90 hover:border-transparent hover:text-gray-200 hover:cursor-pointer rounded-lg border-zinc-950/90 ${
              activeFilter === "all" &&
              "bg-zinc-950/90 border-transparent text-gray-200 hover:cursor-default"
            }`}
          >
            <Link>all</Link>
          </li>
          {tags &&
            tags.map((tag) => {
              return (
                <li
                  onClick={(e) => handleClick(e)}
                  key={tag}
                  className={`w-11/12 border-2 px-1 transform transition-all duration-100 ease-in-out hover:bg-zinc-950/90 hover:border-transparent hover:text-gray-200 hover:cursor-pointer rounded-lg border-zinc-950/90 ${
                    activeFilter === tag &&
                    "bg-zinc-950/90 border-transparent text-gray-200 hover:cursor-default"
                  }`}
                >
                  <Link>{tag}</Link>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
