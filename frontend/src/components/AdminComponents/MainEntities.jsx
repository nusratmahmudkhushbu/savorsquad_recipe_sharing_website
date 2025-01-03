import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { apiStart } from '../../../api';
import UserTable from './UserTable';
import RecipeTable from './RecipeTable';
import DetailsPanel from './DetailsPanel';

const MainEntities = () => {
  const [activeTab, setActiveTab] = useState('Users');
  const [userData, setUserData] = useState([]);
  const [recipeData, setRecipeData] = useState([]);
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [selectedEntityType, setSelectedEntityType] = useState("user");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const tabs = ['Users', 'Recipes'];

  useEffect(() => {
    if (activeTab === 'Users') {
      fetchData('user');
    } else if (activeTab === 'Recipes') {
      fetchData('recipe');
    }
  }, [activeTab]);

  const fetchData = async (type) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${apiStart}/api/${type}/all`);
      if (type === 'user') {
        setUserData(response.data.data);
      } else {
        setRecipeData(response.data);
      }
    } catch (error) {
      setError(`Error fetching ${type} data`);
      console.error(`Error fetching ${type} data:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewEntity = (type,entity) => {
    setSelectedEntity(entity);
    setSelectedEntityType(type);
  };

  const handleDeleteEntity = async (type, id) => {
    const confirmed = window.confirm(`Are you sure you want to delete this ${type}?`);

    if (!confirmed) return;

    try {
      const response = await axios.delete(`${apiStart}/api/${type}/adelete/${id}`, {
        headers: { Authorization: localStorage.getItem('loginToken') },
      });

      if (response.data.success) {
        console.log(`${type} deleted successfully`);
        fetchData(type);
      } else {
        console.error(`Failed to delete ${type}:`, response.data.message);
      }
    } catch (error) {
      console.error('Server error:', error.response?.data || error.message);
    }
  };

  return (
    <div className="flex">
      {/* Left part: Vertical menu */}
      <div className="w-1/6 p-4">
        <h1 className="text-xl font-medium px-4 py-2">Data</h1>
        <ul className="space-y-1">
          {tabs.map((tab) => (
            <li key={tab}>
              <button
                className={`block w-full text-left rounded-lg px-4 py-2 text-sm font-medium ${
                  activeTab === tab ? 'bg-sky-100 text-sky-600' : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Middle part: Table content */}
      <div className="w-1/2 p-4">
        {isLoading ? (
          <p className="text-gray-500">Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : activeTab === 'Users' ? (
          <UserTable
            userData={userData}
            onView={handleViewEntity}
            onDelete={handleDeleteEntity}
          />
        ) : activeTab === 'Recipes' ? (
          <RecipeTable
            recipeData={recipeData}
            onView={handleViewEntity}
            onDelete={handleDeleteEntity}
          />
        ) : null}
      </div>

      {/* Right part: Details Panel */}
      <div className="w-1/3 p-4 bg-gray-100">
        <DetailsPanel entity={selectedEntity} type={selectedEntityType} />
      </div>
    </div>
  );
};

export default MainEntities;
