import React, { useState } from 'react';

const UserTable = ({ userData, onView, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter user data based on search term
  const filteredUsers = userData.filter(
    (user) =>
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (userData.length === 0) {
    return <p className="text-gray-500">Loading...</p>;
  }

  

  return (
    <div>
      <h2 className="text-2xl mb-4">User Entities</h2>

      {/* Search bar */}
      <div className="mb-4">
        <input
          type="text"
          className="border rounded-lg px-4 py-2 w-full"
          placeholder="Search by email or username..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <table className="w-full table-auto min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
        <thead className="ltr:text-left rtl:text-right">
          <tr>
            <th className="border whitespace-nowrap px-4 py-2 font-medium text-gray-900">Email</th>
            <th className="border whitespace-nowrap px-4 py-2 font-medium text-gray-900">Username</th>
            <th className="border whitespace-nowrap px-4 py-2 font-medium text-gray-900">Role</th>
            <th className="px-4 py-2"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td className="border whitespace-nowrap px-4 py-2 font-medium text-gray-900">{user.email}</td>
              <td className="border whitespace-nowrap px-4 py-2 font-medium text-gray-900">{user.username}</td>
              <td className="border whitespace-nowrap px-4 py-2 font-medium text-gray-900">{user.role}</td>
              <td className="whitespace-nowrap px-4 py-2">
                <button
                  onClick={() => onView("user",user)}
                  className="inline-block rounded bg-indigo-600 px-4 py-2 mx-2 text-xs font-medium text-white hover:bg-indigo-700"
                >
                  View
                </button>
                {user.role !== "admin" && (
                  <button
                  onClick={()=> onDelete("user",user._id)}
                  className="inline-block rounded bg-red-600 px-4 py-2 text-xs font-medium text-white hover:bg-red-700"
                >
                  Delete
                </button>
              )}
                {/* <button
                  onClick={()=> onDeleteUser(user)}
                  className="inline-block rounded bg-red-600 px-4 py-2 text-xs font-medium text-white hover:bg-red-700"
                >
                  Delete
                </button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
// import React, { useState } from 'react';
// import axios from 'axios';

// const UserTable = ({ userData, onView, onDelete }) => {
//   const [searchTerm, setSearchTerm] = useState('');

//   // Filter user data based on search term
//   const filteredUsers = userData.filter(
//     (user) =>
//       user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       user.username.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   if (userData.length === 0) {
//     return <p className="text-gray-500">Loading...</p>;
//   }

//   return (
//     <div>
//       <h2 className="text-2xl mb-4">User Entities</h2>

//       {/* Search bar */}
//       <div className="mb-4">
//         <input
//           type="text"
//           className="border rounded-lg px-4 py-2 w-full"
//           placeholder="Search by email or username..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>

//       {filteredUsers.length === 0 ? (
//         <p className="text-gray-500">No users found.</p>
//       ) : (
//         <table className="w-full table-auto min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
//           <thead className="ltr:text-left rtl:text-right">
//             <tr>
//               <th className="border whitespace-nowrap px-4 py-2 font-medium text-gray-900">Email</th>
//               <th className="border whitespace-nowrap px-4 py-2 font-medium text-gray-900">Username</th>
//               <th className="border whitespace-nowrap px-4 py-2 font-medium text-gray-900">Role</th>
//               <th className="px-4 py-2"></th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200">
//             {filteredUsers.map((user) => (
//               <tr key={user.id}>
//                 <td className="border whitespace-nowrap px-4 py-2 font-medium text-gray-900">{user.email}</td>
//                 <td className="border whitespace-nowrap px-4 py-2 font-medium text-gray-900">{user.username}</td>
//                 <td className="border whitespace-nowrap px-4 py-2 font-medium text-gray-900">{user.role}</td>
//                 <td className="whitespace-nowrap px-4 py-2">
//                   <button
//                     onClick={() => onView("user", user)}
//                     className="inline-block rounded bg-indigo-600 px-4 py-2 mx-2 text-xs font-medium text-white hover:bg-indigo-700"
//                   >
//                     View
//                   </button>
//                   {user.role !== 'admin' && (
//                     <button
//                       onClick={() => onDelete("user", user._id)}
//                       className="inline-block rounded bg-red-600 px-4 py-2 text-xs font-medium text-white hover:bg-red-700"
//                     >
//                       Delete
//                     </button>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default UserTable;