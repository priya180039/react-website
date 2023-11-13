import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import Header from "../components/Header";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import DashboardTable from "../components/DashboardTable";

const Dashboard = () => {
  const a = ["tes1", "tes2", "tes3"];
  const [activeCard, setActiveCard] = useState(0);
  return (
    <div className={`bg-main-low min-w-screen min-h-screen bg-fixed bg-cover `}>
      <div id="container">
        {sessionStorage.getItem("isAuth") === "true" ? (
          <>
            <Header />
            <div className="flex justify-between flex-1 w-full">
              <DashboardTable />
            </div>
          </>
        ) : (
          <Navigate to="/sign" />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
