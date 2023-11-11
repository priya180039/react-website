import React from "react";

const NewPost = () => {
  return (
    <div className="lg:w-3/12 xl:w-3/12 mx-2 md:mx-2 xl:mx-0 lg:mx-0 md:w-[97.5%] z-0">
      <form className="w-[calc(100%)] mt-[4rem] md:mt-[4.25rem] lg:mt-[4.25rem] xl:mt-[4.25rem]">
        <input
          className="w-full p-2 rounded-lg mb-2 bg-gray-200 focus:bg-gray-100"
          placeholder="Masukkan judul"
        />
        <textarea
          className="w-full p-2 rounded-lg bg-gray-200 focus:bg-gray-100 min-h-[10rem]"
          placeholder="Masukkan konten"
        />
        <button className="text-gray-200 mt-[2px] rounded-lg p-2 transform transition-all duration-200 ease-in-out text-lg bg-sky-500 hover:bg-gray-200 hover:text-zinc-950/90 w-full">
          Create Post
        </button>
      </form>
    </div>
  );
};

export default NewPost;
