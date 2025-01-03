import React, { useState } from 'react';

const RecipeTable = ({ recipeData, onView, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter recipe data based on search term
  const filteredRecipes = recipeData.filter(
    (recipe) =>
      recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.createdBy.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (recipeData.length === 0) {
    return <p className="text-gray-500">No recipes available...</p>;
  }

  return (
    <div>
      <h2 className="text-2xl mb-4">Recipe Entities</h2>

      {/* Search bar */}
      <div className="mb-4">
        <input
          type="text"
          className="border rounded-lg px-4 py-2 w-full"
          placeholder="Search by name, category, or username..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <table className="w-full table-auto min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
        <thead className="ltr:text-left rtl:text-right">
          <tr>
            <th className="border whitespace-nowrap px-4 py-2 font-medium text-gray-900">Name</th>
            <th className="border whitespace-nowrap px-4 py-2 font-medium text-gray-900">Category</th>
            <th className="border whitespace-nowrap px-4 py-2 font-medium text-gray-900">Uploaded By</th>
            <th className="px-4 py-2"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {filteredRecipes.map((recipe) => (
            <tr key={recipe._id}>
              <td className="border whitespace-nowrap px-4 py-2 font-medium text-gray-900">{recipe.name}</td>
              <td className="border whitespace-nowrap px-4 py-2 font-medium text-gray-900">{recipe.category}</td>
              <td className="border whitespace-nowrap px-4 py-2 font-medium text-gray-900">{recipe.createdBy.username}</td>
              <td className="whitespace-nowrap px-4 py-2">
                <button
                  onClick={() => onView("recipe",recipe)}
                  className="inline-block rounded bg-indigo-600 px-4 py-2 mx-2 text-xs font-medium text-white hover:bg-indigo-700"
                >
                  View
                </button>
                <button
                  onClick={() => onDelete("recipe",recipe._id)}
                  className="inline-block rounded bg-red-600 px-4 py-2 text-xs font-medium text-white hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecipeTable;
