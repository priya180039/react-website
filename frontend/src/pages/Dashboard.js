import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Header from "../components/Header";
import DashboardTable from "../components/DashboardTable";
import DashboardReplies from "../components/DashboardReplies";
import { getAuth } from "../api/Api";

const Dashboard = () => {
  const [changeSection, setChangeSection] = useState("");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (sessionStorage.getItem("isAuth") === "true") {
      getAuth().then((response) => {
        setUserData(response.data);
      });
    }
  }, []);

  return (
    <div className={`bg-main-low min-w-screen min-h-screen bg-fixed bg-cover`}>
      <div id="container">
        {sessionStorage.getItem("isAuth") === "true" ? (
          <>
            <Header />
            {userData && (
              <div className="flex flex-col justify-start w-full">
                <DashboardTable
                  changeSection={changeSection}
                  setChangeSection={setChangeSection}
                />
                {userData.user.role === "expert" && (
                  <DashboardReplies
                    changeSection={changeSection}
                    setChangeSection={setChangeSection}
                  />
                )}
              </div>
            )}
          </>
        ) : (
          <Navigate to="/welcome" />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
