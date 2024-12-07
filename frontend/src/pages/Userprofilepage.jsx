import React from "react";
import Header from "../components/Header";
import UserProfile from "../components/Userprofile";
import PostsList from "../components/PostsList";
import UserSideBar from "../components/UserSideBar";

const Userprofilepage = () => {
  return (
    <div>
      <div className="min-h-screen flex flex-col">
        {/* <Header /> */}

        <div className="flex">
          <UserSideBar />
          <div className="flex-1">
            <UserProfile />
            <div className="flex justify-center">
              <PostsList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Userprofilepage;
