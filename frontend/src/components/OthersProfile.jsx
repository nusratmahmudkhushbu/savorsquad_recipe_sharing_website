import React, { useEffect, useState } from "react";
import { apiStart } from "../../api";
import UserProfileStat from "./UserProfileStat"; // Example profile picture
import axios from "axios";
import OthersPostsList from "./OthersPostsList";

const OthersProfile = ({ userId }) => {
  // Example data, replace with actual data
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});
  const [totalLikes, setTotalLikes] = useState(0);
  useEffect(() => {
    async function getOthersPosts() {
      try {
        const response1 = await axios.get(`${apiStart}/api/user/one/${userId}`);
        setUser(response1.data.data);
        console.log(response1.data);
        console.log(userId);
        const response2 = await axios.post(
          `${apiStart}/api/recipe/userRecipes`,
          { createdBy: userId }
        );
        console.log(response2.data);
        setPosts(response2.data);
        const likes = response2.data.reduce(
          (sum, recipe) => sum + (recipe.recipeLikeCount || 0),
          0
        );
        setTotalLikes(likes);
      } catch (error) {
        console.log(error);
      }
    }
    getOthersPosts();
  }, []);

  return (
    <>
      <div className="p-6 max-w-screen-md mx-auto">
        <div className="flex items-center space-x-4 mb-6">
          <img
            // src={userObj?.photo}
            src={`${apiStart}${user?.photo}`}
            alt="Profile"
            className="h-24 w-24 rounded-full border-2 border-gray-300"
          />
          <div className="flex gap-2 flex-col">
            <h1 className="text-2xl font-bold">{user?.username}</h1>
            <p className="text-sm text-gray-600">{user?.email}</p>
          </div>
        </div>
        <div className="mt-6 mb-6">
          <h2 className="text-xl font-semibold mb-2">Bio</h2>
          <p className="text-sm text-gray-600">{user?.bio}</p>
        </div>
        <UserProfileStat
          postsCount={posts?.length}
          likesOnProfile={totalLikes}
          creditPoints={user?.creditPoints}
        />
      </div>
      <div className="flex justify-center">
        <OthersPostsList posts={posts} />
      </div>
    </>
  );
};

export default OthersProfile;
