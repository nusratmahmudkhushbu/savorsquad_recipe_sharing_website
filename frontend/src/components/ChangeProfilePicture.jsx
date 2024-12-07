import React, { useState } from "react";
import axios from "axios";
import { apiStart } from "../../api";

const ChangeProfilePicture = ({ onUploadComplete }) => {
  const [photo, setPhoto] = useState(null);
  const [loading, setIsLoading] = useState(false);

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!photo) return;

    const formData = new FormData();
    formData.append("photo", photo);

    try {
      setIsLoading(true);
      const response = await axios.post(
        `${apiStart}/api/user/upload-profile-picture`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: localStorage.getItem("loginToken"),
          },
        }
      );

      if (response.data.success) {
        onUploadComplete(response.data.photo); 
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 w-96 bg-white rounded-lg shadow-md my-4 mb-8">
      <h2 className="text-2xl font-bold mb-4">Change Profile Picture</h2>
      <input type="file" onChange={handlePhotoChange} />
      <button
        onClick={handleUpload}
        disabled={loading}
        className="mt-2 w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
      >
        {loading ? "Uploading..." : "Update"}
      </button>
    </div>
  );
};

export default ChangeProfilePicture;
