import React, { useState } from "react";
import Header from "../components/Header";
import ProfileForm from "../components/ProfileForm";
import { Navigate } from "react-router-dom";
import ProfileSide from "../components/ProfileSide";

const Profile = () => {
  const [update, setUpdate] = useState(false);
  return (
    <div className={`bg-main-low min-w-screen min-h-screen bg-fixed bg-cover `}>
      <div id="container">
        {sessionStorage.getItem("isAuth") === "true" ? (
          <>
            <Header />
            <div className="w-full flex flex-col flex-1 md:flex-row lg:flex-row xl:flex-row justify-between">
              <ProfileSide update={update} setUpdate={setUpdate} />
              <ProfileForm setUpdate={setUpdate} />
            </div>
          </>
        ) : (
          <Navigate to="/sign" />
        )}
      </div>
    </div>
  );
};

export default Profile;
