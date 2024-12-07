import React, { useEffect, useState } from "react";
import UserProfileStat from "./UserProfileStat"; // Example profile picture
import { useAuth } from "../contexts/AuthContext";
import { HiMiniPencilSquare } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { apiStart } from "../../api";

import axios from "axios";

const UserProfile = () => {
  const { userObj } = useAuth();
  const [posts, setPosts] = useState([]);
  const [totalLikes, setTotalLikes] = useState(0);

  useEffect(() => {
    async function getUserPosts() {
      try {
        console.log(userObj._id);
        const response = await axios.post(
          `${apiStart}/api/recipe/userRecipes`,
          { createdBy: userObj?._id }
        );
        console.log(response.data);
        setPosts(response.data.length);
        const likes = response.data.reduce(
          (sum, recipe) => sum + (recipe.recipeLikeCount || 0),
          0
        );
        setTotalLikes(likes);
      } catch (error) {
        console.log(error);
      }
    }
    getUserPosts();
  }, []);

  return (
    <div className="p-6 max-w-screen-md mx-auto">
      <div className="flex items-center space-x-4 mb-6">
        <img
          // src={userObj?.photo}
          src={`${apiStart}${userObj.photo}`}
          alt="Profile"
          className="h-24 w-24 rounded-full border-2 border-gray-300"
        />
        <div>
          <div className="flex gap-2 items-center">
            <h1 className="text-2xl font-bold">{userObj?.username}</h1>
            <Link to="/Userprofile/editprofile">
              <HiMiniPencilSquare />
            </Link>
          </div>

          <p className="text-sm text-gray-600">{userObj?.email}</p>
        </div>
      </div>
      <div className="mt-6 mb-6">
        <h2 className="text-xl font-semibold mb-2">Bio</h2>
        <p className="text-sm text-gray-600">{userObj?.bio}</p>
      </div>
      <UserProfileStat
        postsCount={posts}
        likesOnProfile={totalLikes}
        creditPoints={userObj?.creditPoints}
      />
    </div>
  );
};

export default UserProfile;
