import React from 'react';

const UserPosts = ({ posts }) => {
  return posts.length > 0 ? (
    <ul className="list-disc pl-5">
      {posts.map((post) => (
        <li key={post._id}>
          <p className="text-purple-800"><strong>Title:</strong> {post.name}</p>
          <p><strong>Category:</strong> {post.category}</p>
        </li>
      ))}
    </ul>
  ) : (
    <p className="text-gray-500">No posts available for this user.</p>
  );
};

export default UserPosts;
