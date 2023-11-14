import React, { useEffect, useState } from "react";
import { useHeader } from "../features/HeaderContext";
import { BiSend, BiX } from "react-icons/bi";
import { createPost } from "../api/Api";
import { Link } from "react-router-dom";

const NewPost = (props) => {
  const [disable, setDisable] = useState(false);
  const [tagRef, setTagRef] = useState("");
  const [inputTags, setInputTags] = useState([]);
  const [inputTitle, setInputTitle] = useState("");
  const [inputContent, setInputContent] = useState("");

  const { sideToggle } = useHeader();

  useEffect(() => {
    if (!inputTitle || !inputContent) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [inputTitle, inputContent]);

  const handleSubmit = (e) => {
    e.preventDefault();
    createPost({
      userId: "",
      title: inputTitle,
      content: inputContent,
      tags: inputTags,
    });
    setInputTitle("");
    setInputContent("");
    setInputTags([]);
    props.setUpdated(true);
  };

  return (
    <div className="relative lg:w-3/12 xl:w-3/12 mx-2 md:mx-2 xl:mx-0 lg:mx-0 md:w-[97.5%] z-0">
      <form
        onSubmit={handleSubmit}
        className={`${
          sideToggle ? "overflow-hidden max-h-0" : ""
        } w-[calc(100%)] lg:max-h-[calc(100vh-4.25rem)] lg:overflow-auto xl:max-h-[calc(100vh-4.25rem)] xl:overflow-auto mt-[4rem] md:mt-[4.25rem] lg:mt-[4.25rem] xl:mt-[4.25rem] transform transition-all duration-500 ease-in-out`}
      >
        <input
          name="title"
          value={inputTitle}
          onChange={(e) => setInputTitle(e.target.value)}
          className="w-full p-2 rounded-lg mb-2 bg-gray-200 focus:bg-gray-100"
          placeholder="Masukkan judul"
        />
        <textarea
          name="content"
          value={inputContent}
          onChange={(e) => setInputContent(e.target.value)}
          className="w-full p-2 rounded-lg mb-0.5 bg-gray-200 focus:bg-gray-100 min-h-[10rem]"
          placeholder="Masukkan konten"
        />
        <div className="flex p flex-1 mb-2 rounded-lg items-center bg-gray-200">
          <input
            name="tags"
            value={tagRef}
            onChange={(e) => setTagRef(e.target.value)}
            className="w-full p-2 rounded-ss-lg rounded-es-lg bg-gray-200 focus:bg-gray-100"
            placeholder="Tambahkan tags..."
          />
          <BiSend
            onClick={() => {
              const uniqueTags = new Set([...inputTags, tagRef.trim()]);
              setInputTags([...uniqueTags]);
              setTagRef("");
            }}
            className="text-4xl scale-110 mx-2 text-zinc-950/90 hover:text-sky-500 hover:cursor-pointer"
          />
        </div>
        {inputTags && (
          <div className="flex gap-2 flex-wrap overflow-auto">
            {inputTags.map((tag) => {
              return (
                <div
                  onClick={() => {
                    setInputTags((prev) => prev.filter((ptag) => ptag !== tag));
                  }}
                  key={tag}
                  className="rounded-xl flex items-center overflow-hidden justify-center pl-2 pr-1 py-1 bg-sky-500 text-zinc-950/90 hover:cursor-pointer hover:text-gray-200"
                >
                  <p className="text-lg pb-1 overflow-ellipsis overflow-hidden">
                    {tag}
                  </p>
                  <BiX className="text-xl ml-1" />
                </div>
              );
            })}
          </div>
        )}
        <Link
          onClick={() => {
            setInputTitle("");
            setInputContent("");
            setTagRef("");
            setInputTags([]);
          }}
          className={`text-gray-200 text-center mb-2 ${
            inputTags.length > 0 ? "mt-2.5" : "mt-0.5"
          } rounded-lg p-2 transform transition-all duration-200 ease-in-out text-lg bg-red-500 hover:bg-gray-200 hover:text-zinc-950/90 inline-block w-full ${
            inputTitle || inputContent || inputTags.length > 0 || tagRef
              ? ""
              : "hidden"
          }`}
        >
          Reset
        </Link>
        <button
          disabled={disable}
          type="submit"
          className="text-gray-200 rounded-lg p-2 lg:mb-2 xl:mb-2 transform transition-all duration-200 ease-in-out text-lg bg-sky-500 hover:bg-gray-200 hover:text-zinc-950/90 w-full disabled:bg-gray-400 disabled:text-zinc-950/90 disabled:hover:cursor-default"
        >
          Create Post
        </button>
      </form>
    </div>
  );
};

export default NewPost;
