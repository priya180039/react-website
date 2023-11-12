import React from "react";

const ProfileSide = () => {
  return (
    <div className="relative w-3/12 sm:w-2/12 md:w-2/12 lg:w-2/12 xl:w-[calc(25%-1rem)] ml-2 z-0">
      <div className="bg-gray-200 rounded-md md:mt-[2.75rem] lg:mt-[2.75rem] xl:mt-[2.75rem] py-4">
        <div className="w-[4rem] mb-2 sm:w-[4.5rem] lg:w-[5.25rem] md:w-[5.25rem] xl:w-[13rem] mx-auto md lg:mr-auto xl:mr-auto rounded-full overflow-hidden shadow-2xl">
          <img
            className="w-full"
            src={`https://picsum.photos/id/231/100`}
            alt="profile"
          />
        </div>
        <div className="flex flex-col w-[13rem] mx-auto">
          <div className="bg-gray-300 rounded-md p-2 px-4 my-2 w-full shadow-xl">
            <p className="scale-105">Joined at: 08-11-2023</p>
          </div>
          <div className="bg-gray-300 rounded-md p-2 px-4 mt-2 w-full shadow-xl">
            <p className="scale-105">Role: Learner</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSide;
