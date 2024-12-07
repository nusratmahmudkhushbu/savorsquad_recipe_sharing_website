import React from "react";

const UserProfileStat = ({ postsCount, likesOnProfile, creditPoints }) => {
  return (
    <div className="flex items-center justify-around bg-white p-4 rounded-lg shadow-md">
      <div className="text-center">
        <h2 className="text-2xl font-semibold">{postsCount}</h2>
        <p className="text-sm text-gray-600">Posts</p>
      </div>
      <div className="text-center">
        <h2 className="text-2xl font-semibold">{likesOnProfile}</h2>
        <p className="text-sm text-gray-600">Likes</p>
      </div>
      <div className="text-center">
        <h2 className="text-2xl font-semibold">{creditPoints}</h2>
        <p className="text-sm text-gray-600">Credit Points</p>
      </div>
    </div>
  );
};

export default UserProfileStat;
