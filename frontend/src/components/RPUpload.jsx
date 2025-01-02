import React, { useState } from 'react';
import axios from 'axios';
import { apiStart } from '../../api';

const FileUpload = ({ photolink }) => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile); // Update the state with the selected file

    if (selectedFile) {
      await uploadFile(selectedFile); // Call the upload function directly
    }
  };

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('image', file); // Append the file to FormData

    try {
      const response = await axios.post(`${apiStart}/api/recipe/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setMessage('File uploaded successfully!');
      photolink(response.data.file.path); // Pass uploaded file path back
    } catch (error) {
      setMessage('Failed to upload file.');
    }
  };

  const handleManualUpload = async () => {
    if (file) {
      await uploadFile(file);
    } else {
      setMessage('Please select a file to upload.');
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">

      <label className="block">
        <input
          type="file"
          className="hidden"
          onChange={handleFileChange}
          accept="image/*"
        />
        <span className="inline-block px-6 py-2 bg-green-500 text-white font-medium text-sm leading-tight uppercase rounded shadow-md hover:bg-purple-600 hover:shadow-lg focus:bg-purple-600 focus:shadow-lg focus:outline-none focus:ring-0 transition duration-150 ease-in-out cursor-pointer">
          Choose File
        </span>
      </label>

      <button
        onClick={handleManualUpload}
        className="px-6 py-2 bg-purple-500 text-white font-medium text-sm leading-tight uppercase rounded shadow-md hover:bg-purple-600 hover:shadow-lg focus:bg-purple-600 focus:shadow-lg focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
      >
        Confirm Upload
      </button>

      {message && <div className="mt-2 text-sm text-gray-700">{message}</div>}
    </div>
  );
};

export default FileUpload;
