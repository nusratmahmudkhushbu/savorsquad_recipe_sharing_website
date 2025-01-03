import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { TextField } from '@mui/material';

import { apiStart } from '../../../api';

const Roles = () => {
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${apiStart}/api/user/all`);
      setUserData(response.data.data);
    } catch (error) {
      setError('Error fetching user data');
      console.error('Error fetching user data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const columns = [
    { field: 'username', headerName: 'Username', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    {
      field: 'photo',
      headerName: 'Photo',
      width: 100,
      renderCell: (params) => (
        <img src={`${apiStart}${params.value}`} alt="Profile" className="w-12 h-12 rounded-full" />
      ),
    },
    { field: 'role', headerName: 'Role', width: 130 },
    { field: 'creditPoints', headerName: 'Credit Points', width: 130 },
    { field: 'bio', headerName: 'Bio', width: 200 },

  ];

  const filteredData = userData.filter(user => 
    user.username.toLowerCase().includes(searchInput.toLowerCase()) ||
    user.email.toLowerCase().includes(searchInput.toLowerCase()) ||
    user.role.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div className="p-4">
      <div className="mb-4">
        <TextField 
          label="Search" 
          variant="outlined" 
          value={searchInput} 
          onChange={(e) => setSearchInput(e.target.value)} 
          className="w-full"
        />
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div style={{ height: 600, width: '100%' }}>
          <DataGrid 
            rows={filteredData} 
            columns={columns} 
            pageSize={10} 
            rowsPerPageOptions={[5, 10, 20]} 
            disableSelectionOnClick
            getRowId={(row) => row._id} 
          />
        </div>
      )}
    </div>
  );
}

export default Roles;
