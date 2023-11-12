import React from "react";
import Header from "../components/Header";
import ProfileForm from "../components/ProfileForm";
import { Navigate } from "react-router-dom";
import ProfileSide from "../components/ProfileSide";

const Profile = () => {
  return (
    <div className={`bg-main-low min-w-screen min-h-screen bg-fixed bg-cover `}>
      <div id="container">
        ;
        {sessionStorage.getItem("isAuth") === "true" ? (
          <>
            <Header />
            <div className="w-full flex justify-between">
              <ProfileSide />
              <ProfileForm />
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
