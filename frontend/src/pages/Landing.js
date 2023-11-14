import React from "react";
import Welcome from "../components/Welcome";

const Landing = () => {
  return (
    <>
      <div className="relative h-screen w-screen bg-fixed bg-cover">
        <div className="bg-landing fixed inset-0 bg-fixed bg-cover bg-center brightness-[.4]"></div>
        <div className={`transform transition-all duration-500 ease-in-out`}>
          <Welcome />
        </div>
      </div>
    </>
  );
};

export default Landing;
