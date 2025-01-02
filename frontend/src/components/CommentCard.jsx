import axios from "axios";
import React, { useEffect, useState } from "react";
import { apiStart } from "../../api";

const CommentCard = ({ commentedBy, comment }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    async function getUser() {
      try {
        const response = await axios.get(
          `${apiStart}/api/user/one/${commentedBy}`
        );
        setUser(response.data.data);
      } catch (error) {
        console.log("Error");
      }
    }
    getUser();
  }, []);
  return (
    <div className="flex items-start mb-4 w-full">
      <img
        src={`${apiStart}${user?.photo}`}
        alt="User Avatar"
        className="w-10 h-10 rounded-full object-cover mr-3"
      />
      <div>
        <div className="flex items-center">
          <span className="text-gray-500 italic font-bold text-lg">
            {user?.username}
          </span>
          {/* <span class="text-gray-500 text-xs ml-2">2 hours ago</span> */}
        </div>
        <p className="text-gray-800">{comment}</p>
      </div>
    </div>
  );
};

export default CommentCard;
