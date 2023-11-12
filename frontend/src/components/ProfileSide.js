import React, { useEffect, useState } from "react";
import { getAuth } from "../api/Api";

const ProfileSide = (props) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    getAuth().then((response) => {
      setUserData(response.data);
    });
    props.setUpdate(false);
  }, [props.update, props]);

  const dateHandler = () => {
    if (userData !== null) {
      const dataDate = new Date(userData.user.createdAt);
      const dd = dataDate.getDate().toString().padStart(2, "0");
      const mm = (dataDate.getMonth() + 1).toString().padStart(2, "0");
      const yyyy = dataDate.getFullYear();

      const formattedDate = `Joined at: ${dd}-${mm}-${yyyy}`;
      return formattedDate;
    }
  };

  const date = dateHandler();

  return (
    <div className="relative w-[calc(100%-1rem)] sm:w-[calc(100%-1rem)] md:w-[calc(33.333333%-1rem)] lg:w-[calc(25%-1rem)] xl:w-[calc(25%-1rem)] mx-auto md:ml-2 lg:ml-2 xl:ml-2 z-0">
      {userData && (
        <div className="bg-gray-200 rounded-md mt-[4rem] md:mt-[4.25rem] lg:mt-[4.25rem] xl:mt-[4.25rem] py-6">
          <div className="mb-2 w-[10rem] sm:w-[10rem] lg:w-[12.35rem] md:w-[11rem] xl:w-[13rem] mx-auto md lg:mr-auto xl:mr-auto rounded-full overflow-hidden shadow-2xl">
            <img
              className="w-full"
              src={`https://picsum.photos/id/231/100`}
              alt="profile"
            />
          </div>
          <div className="flex text-center flex-col w-6/12 md:w-9/12 lg:w-9/12 xl:w-9/12 mx-auto">
            <div className="bg-gray-300 rounded-md p-2 px-4 my-3 md:my-2 lg:my-2.5 xl:my-2 w-full shadow-xl">
              <p className="scale-105">
                {userData.user.firstName + " " + userData.user.lastName}
              </p>
            </div>
            <div className="bg-gray-300 rounded-md p-2 px-4 my-3 md:my-2 lg:my-2.5 xl:my-2 w-full shadow-lg">
              <p className="scale-105">{userData.user.role}</p>
            </div>
            <div className="bg-gray-300 rounded-md p-2 px-4 mt-3 md:mt-2 lg:mt-2.5 xl:mt-2 w-full shadow-lg">
              <p className="scale-105">{date}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileSide;
