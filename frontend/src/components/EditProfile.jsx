import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import { apiStart } from "../../api";
import { useNavigate } from "react-router-dom";
import ChangeProfilePicture from "./ChangeProfilePicture";

const EditProfile = () => {
  const { userObj, checkTokenValidity } = useAuth();
  const [username, setUsername] = useState(userObj?.username);
  const [bio, setBio] = useState(userObj?.bio);
  const [photo, setPhoto] = useState(userObj?.photo);
  const [loading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleUploadComplete = (newPhoto) => {
    setPhoto(newPhoto);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${apiStart}/api/user/update`,
        { username, bio, photo },
        { headers: { Authorization: localStorage.getItem("loginToken") } }
      );

      if (response.data.success) {
        checkTokenValidity();
        navigate("/userprofile");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold mb-6 text-teal-700">Edit Profile</h2>
      
      <div className="flex items-center justify-center mb-6">
        {photo ? (
          <img
            src={`${apiStart}${photo}`}
            alt="Profile"
            className="h-24 w-24 rounded-full shadow-lg"
          />
        ) : (
          <span className="inline-block h-24 w-24 rounded-full overflow-hidden bg-gray-100">
            <svg
              className="h-full w-full text-gray-300"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M24 0H0v24h24V0z" fill="none" />
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </span>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            className="w-full rounded-lg border-gray-200 p-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="bio"
            className="block text-sm font-medium text-gray-700"
          >
            Bio
          </label>
          <textarea
            id="bio"
            rows="4"
            className="w-full rounded-lg border-gray-200 p-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-6 mb-4 text-sm font-medium rounded-lg text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition ease-in-out duration-150"
        >
          {loading ? "Saving Changes..." : "Save Changes"}
        </button>
      </form>

      <ChangeProfilePicture onUploadComplete={handleUploadComplete} />
    </div>
  );
};

export default EditProfile;
