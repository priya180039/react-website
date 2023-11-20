import React from "react";
import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";

const Welcome = () => {
  return (
    <div className="w-full m-auto overflow-hidden h-screen flex flex-col flex-1 items-center">
      <div className="flex flex-col justify-center xl:gap-20 lg:gap-20 md:gap-16 gap-14 items-center h-screen my-auto">
        <div className="inline-block text-center w-full reacttype text-2xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl scale-105 sm:scale-125 md:scale-125 lg:scale-125 xl:scale-125 items-center justify-center pt-1 pb-2 font-exo brightness-150 font-bold">
          <h1 className="mr-2.5 inline-block">Welcome to</h1>
          <Typewriter
            words={["my website", "discussion forum"]}
            loop={true} // Mengulang pengetikan
            cursor={true}
            delaySpeed={1800}
            cursorStyle="|"
            cursorColor="inherit"
            cursorBlinking={true}
            typeSpeed={50} // Kecepatan pengetikan (dalam milidetik)
            deleteSpeed={50} // Kecepatan penghapusan (jika memilih untuk menghapus)
          />
        </div>
        <div className="xl:scale-100 lg:scale-100 md:scale-95 sm:scale-75 scale-75">
          <Link
            to="/sign"
            className="bg-green-700 hover:bg-green-500 text-gray-200 font-lora rounded-md px-7 py-3.5 text-2xl"
          >
            Start
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
