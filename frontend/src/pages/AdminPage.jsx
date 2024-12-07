import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import logo from "/logo.svg";

import Billing from "../components/AdminComponents/Billing";
import MainEntities from "../components/AdminComponents/MainEntities";
import Roles from "../components/AdminComponents/Roles";
import MinimartManager from "../components/AdminComponents/MinimartManager";

const AdminPage = () => {
  const { isAuthenticated, userObj } = useAuth();
  const [activeTab, setActiveTab] = useState("Main Entities");

  const tabs = ["Main Entities", "Billing Info", "User Roles", "Minimart Items"];

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-xl mb-4">You must be logged in to view this page.</p>
        <Link to="/login" className="text-blue-500">
          Go to Login
        </Link>
      </div>
    );
  }

  if (userObj.role !== "admin") {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-xl mb-4">
          You must be logged in as ADMIN to view this page.
        </p>
        <Link to="/" className="text-blue-500">
          Go to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="font-sans">
      {/* <header className="bg-white">
        <div className="flex justify-center py-5">
          <Link to="/"><img src={logo} alt="logo" className="h-12 w-auto" /></Link>
          <h1 className="text-red-700 font-bold text-2xl ml-4">Admin Page</h1>
        </div>
      </header> */}

      <div className="max-w-screen-xl mx-auto">
        <div className="p-4">
          <div className="sm:hidden">
            <label htmlFor="Tab" className="sr-only">
              Tab
            </label>
            <select
              id="Tab"
              className="w-full rounded-md border-gray-200"
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
            >
              {tabs.map((tab) => (
                <option key={tab}>{tab}</option>
              ))}
            </select>
          </div>

          <div className="hidden sm:flex justify-center">
            <nav className="flex gap-6" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  className={`shrink-0 rounded-lg p-2 text-sm font-medium hover:bg-gray-50 ${
                    activeTab === tab
                      ? "bg-sky-100 text-sky-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>
        </div>

        <div className="mt-6">
          {activeTab === "Main Entities" && <MainEntities />}
          {activeTab === "Billing Info" && <Billing />}
          {activeTab === "User Roles" && <Roles />}
          {activeTab === "Minimart Items" && <MinimartManager />}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
