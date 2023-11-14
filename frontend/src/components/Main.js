import React, { useEffect, useState } from "react";
import { getReplies, getThreads } from "../api/Api";
import { useHeader } from "../features/HeaderContext";
import { useFilter } from "../features/FilterContext";
import { BiComment } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const Main = (props) => {
  const [threads, setThreads] = useState([]);
  const [replies, setReplies] = useState([]);
  const { sideToggle } = useHeader();
  const { activeFilter } = useFilter();
  const navigate = useNavigate();

  useEffect(() => {
    getThreads().then((response) => {
      setThreads(response.data);
    });
    getReplies().then((response) => {
      setReplies(response.data);
    });
    props.setUpdated(false);
  }, [props.updated, props]);

  const filteredThreads = threads.filter((thread) => {
    return thread.tags.includes(activeFilter) || activeFilter === "all";
  });

  return (
    <div className="lg:w-7/12 xl:w-7/12 relative mx-2 lg:mt-[3.75rem] xl:mt-[3.75rem] md:w-[97.5%] z-0">
      <div
        className={`${
          sideToggle ? "overflow-hidden max-h-0" : ""
        } md:max-h-fit lg:max-h-[calc(100vh-4rem)] xl:max-h-[calc(100vh-4.25rem)] md:overflow-hidden lg:overflow-auto xl:overflow-auto transform transition-all duration-500 ease-in-out`}
      >
        {filteredThreads.map((thread) => {
          return (
            <div
              key={thread.uuid}
              className="flex flex-1 bg-gray-200 rounded-md py-4 pr-5 lg:pr-5 xl:pr-7 md:pr-5 mt-2 justify-between my-1"
            >
              <div
                onClick={() => {
                  navigate(`/thread/${thread.uuid}`);
                  sessionStorage.setItem("activeTab", "");
                }}
                className="w-full transform transition-all duration-300 ease-in-out hover:scale-105 xl:hover:translate-x-1 hover:cursor-pointer"
              >
                <div className="flex mb-3 mt-2">
                  <div className="w-3/12 sm:w-2/12 md:w-2/12 lg:w-2/12 xl:w-2/12 text-center">
                    <p
                      className={`w-[4rem] sm:w-[4.5rem] lg:w-[4.5rem] md:w-[5.25rem] xl:w-[6rem] mx-auto lg:mr-auto xl:mr-auto ${
                        thread.user.role === "expert"
                          ? "bg-zinc-950/90"
                          : "bg-sky-500"
                      } text-gray-200 rounded-lg shadow-xl`}
                    >
                      {thread.user.role}
                    </p>
                  </div>
                  <div className="w-fit rounded-md px-2 mb-3 bg-gray-300">
                    <p className="shadow-md">{thread.user.name}</p>
                  </div>
                </div>
                <div className="flex w-full  lg:w-full md:w-full justify-between">
                  <div className="w-3/12 sm:w-2/12 md:w-2/12 lg:w-2/12 xl:w-2/12">
                    <div className="w-[4rem] sm:w-[4.5rem] lg:w-[4.5rem] md:w-[5.25rem] xl:w-[6rem] mx-auto lg:mr-auto xl:mr-auto rounded-full overflow-hidden shadow-xl">
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
                  <div className="w-9/12 sm:w-10/12 md:w-10/12 lg:w-10/12 xl:w-10/12">
                    <p className="w-fit rounded-md mb-3 px-2 py-1 shadow-lg bg-gray-300">
                      {thread.title}
                    </p>
                    <p className="w-full rounded-md my-3 px-2 py-1 shadow-xl bg-gray-300">
                      {thread.content}
                    </p>
                  </div>
                </div>
                {replies && (
                  <div className="flex mt-3 justify-end items-center">
                    <BiComment className="text-zinc-950/90 text-xl" />
                    <p className="text-lg pb-0.5">
                      {
                        replies.filter((reply) => reply.thread.id === thread.id)
                          .length
                      }
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Main;
