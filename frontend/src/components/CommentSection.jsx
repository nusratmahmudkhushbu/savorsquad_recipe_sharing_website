import React, { useState } from "react";
import CommentCard from "./CommentCard";
import { useAuth } from "../contexts/AuthContext";
import { apiStart } from "../../api";
import axios from "axios";

const CommentSection = ({ comments, recipeID }) => {
  const [newComment, setNewComment] = useState("");
  const { userObj, isAuthenticated } = useAuth();
  const [recipeComments, setRecipeComments] = useState(comments || []);
  const [isLoading, setIsLoading] = useState(false);

  const handlePostComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      setIsLoading(true);
      const response = await axios.post(`${apiStart}/api/recipe/comments`, {
        recipeID,
        comment: newComment,
        userId: userObj?._id,
      });

      setRecipeComments((previousComments) => [
        ...previousComments,
        response.data.data,
      ]);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
      setNewComment("");
    }
  };

  return (
    <div className="mt-2">
      <h2 className="text-xl font-semibold mb-2">Comments</h2>
      <div className="max-w-full mx-auto p-4 bg-white rounded-lg shadow-md">
        {recipeComments.length > 0 ? (
          <div className="mb-2 max-h-64 overflow-y-auto">
            {recipeComments?.map((comment) => (
              <CommentCard
                key={comment._id}
                commentedBy={comment.commentedBy}
                comment={comment.comment}
              />
            ))}
          </div>
        ) : (
          <h2 className="text-sm font-semibold text-gray-400 text-center mb-2">
            No comments yet
          </h2>
        )}

        {isAuthenticated ? (
          <form
            onSubmit={handlePostComment}
            className="flex items-center border-t pt-4"
          >
            <input
              type="text"
              className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button
              className="text-teal-600 hover:text-teal-800 ml-2 font-medium"
              disabled={isLoading}
            >
              {isLoading ? "Posting..." : "Post"}
            </button>
          </form>
        ) : (
          <div className="mt-2 text-sm text-gray-400 text-center font-semibold">
            Please log in to comment on this recipe
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
