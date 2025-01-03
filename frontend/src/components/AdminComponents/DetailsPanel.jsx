import React from 'react';

const DetailsPanel = ({ entity,type }) => {
  if (!entity) {
    return <p className="text-gray-500">No entity selected.</p>;
  }

  return (
    <div>
      {type==="user" ? (
        <div>
          <h3 className="text-xl font-medium mb-2">User Details</h3>
          <p><strong>Id:</strong> {entity._id}</p>
          <p><strong>Email:</strong> {entity.email}</p>
          <p><strong>Username:</strong> {entity.username}</p>
          <p><strong>Role:</strong> {entity.role}</p>
          <p><strong>Created At:</strong> {new Date(entity.createdAt).toLocaleString()}</p>
          <p><strong>Updated At:</strong> {new Date(entity.updatedAt).toLocaleString()}</p>
        </div>
      ) : (
        <div>
          <h3 className="text-xl font-medium mb-2">Recipe Details</h3>
          <p><strong>Name:</strong> {entity.name}</p>
          <p><strong>Category:</strong> {entity.category}</p>
          <p><strong>Tags:</strong> {entity.tags.join(', ')}</p>
          <p><strong>Prep Time:</strong> {entity.prepTime}</p>
          <p><strong>Cook Time:</strong> {entity.cookTime}</p>
          <p><strong>Servings:</strong> {entity.servings}</p>
          <p><strong>Difficulty:</strong> {entity.difficulty}</p>
          <p><strong>Recipe Like Count:</strong> {entity.recipeLikeCount}</p>
        </div>
      )}
    </div>
  );
};

export default DetailsPanel;
