import React, { useEffect, useState } from "react";
import CommentSection from "./CommentSection";
import { HiOutlineChatBubbleOvalLeftEllipsis } from "react-icons/hi2";
import { HiHeart } from "react-icons/hi2";
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import { apiStart } from "../../api";
import { useAuth } from "../contexts/AuthContext";
import { FadeLoader } from "react-spinners";
import SpinnerMini from "./SpinnerMini";
  
  


const ViewRecipe = ({ onClose, recipeId, isOpen }) => {
  const [recipe, setRecipe] = useState({});
  const [username, setUsername] = useState([]);
  const [loading, setLoading] = useState(false);

  const categoryStyles = {
    Entrees: { backgroundColor: "#f0f5c4", color: "#59871f" },
    Breakfast: { backgroundColor: "#efedfa", color: "#3c3a8f" },
    Lunch: { backgroundColor: "#e5f7f3", color: "#1f8787" },
    Desserts: { backgroundColor: "#e8f5fa", color: "#397a9e" },
    Sides: { backgroundColor: "#feefc9", color: "#d16400" },
    Drinks: { backgroundColor: "#ffeae3", color: "#f0493e" },
    default: { backgroundColor: "#fff", color: "#000" },
  };

  const { userObj, isAuthenticated } = useAuth();
  const getCategoryStyle = (category) => {
    return categoryStyles[category] || categoryStyles.default;
  };
  const categoryStyle = getCategoryStyle(recipe?.category);
  const userLiked = recipe?.likedUsers?.includes(userObj._id);

  async function fetchRecipe() {
    try {
      setLoading(true);
      const response1 = await axios.get(
        `${apiStart}/api/recipe/one/${recipeId}`
      );
      console.log(response1.data);

      const response2 = await axios.get(
        `${apiStart}/api/user/one/${response1.data.data?.createdBy}`
      );

      console.log(response2.data);

      setRecipe(response1.data.data);
      setUsername(response2.data.data.username);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchRecipe();
  }, [recipeId]);

  async function updateLike() {
    try {
      const response = await axios.get(
        `${apiStart}/api/recipe/one/${recipeId}`
      );
      console.log(response.data);

      setRecipe((prev) => {
        const newRecipe = {
          ...prev,
          recipeLikeCount: response.data.data.recipeLikeCount,
          likedUsers: response.data.data.likedUsers,
        };

        return newRecipe;
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function handleLike() {
    try {
      console.log(recipe?.likedUsers, userObj._id);
      const response = await axios.post(`${apiStart}/api/recipe/addlike`, {
        recipeID: recipe?._id,
        userId: userObj._id,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      updateLike();
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white shadow-md rounded-lg overflow-hidden flex max-w-4xl mx-4 sm:mx-auto w-full h-[640px]">
        {loading ? (
          <SpinnerMini />
        ) : (
          <>
            {/* Recipe Image */}
            <div className="w-full sm:w-1/3 h-64 sm:h-auto sm:flex-none">
              <img
                src={recipe?.photo}
                alt={recipe?.name}
                className="object-cover w-full h-full"
              />
            </div>
            {/* Recipe Details */}
            <div className="p-6 flex-1 overflow-auto ">
              <div className="flex justify-between items-start ">
                <h1 className="text-3xl font-semibold mb-4">{recipe?.name}</h1>
                <button
                  onClick={onClose}
                  className="text-gray-600 hover:text-gray-800 focus:outline-none "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex gap-1 items-center pb-1">
                <p className="text-gray-950 text-sm">Posted by</p>
                <Link to={ userObj._id === recipe.createdBy ? "/userprofile"  : `/viewprofilepage/${recipe.createdBy}`}
              className="text-gray-500 italic font-bold text-lg"
            >
              {username}
            </Link>
              </div>
              {/* Category and Difficulty */}
              <div className="mb-4 mt-4">
                <div className="flex items-center gap-2 pb-2">
                  <button
                    className="py-2 px-4 font-medium text-sm rounded-full shadow-md hover:shadow-lg transition duration-300"
                    style={{
                      backgroundColor: categoryStyle.backgroundColor,
                      color: categoryStyle.color,
                    }}
                  >
                    {recipe?.category}
                  </button>
                  <div className="py-2 px-4 font-medium text-sm rounded-full shadow-md hover:shadow-lg transition duration-300 bg-yellow-100 text-yellow-600">
                    {recipe?.difficulty}
                  </div>
                </div>
                {/* <span className="ml-4 text-gray-500">• {recipe.difficulty}</span> */}
              </div>

              {/* Prep Time, Cook Time, Servings */}
              <div className="flex flex-wrap mb-4">
                <div className="w-full sm:w-1/3 mb-2 sm:mb-0">
                  <strong>Prep Time:</strong> {recipe?.prepTime}
                </div>
                <div className="w-full sm:w-1/3 mb-2 sm:mb-0">
                  <strong>Cook Time:</strong> {recipe?.cookTime}
                </div>
                <div className="w-full sm:w-1/3">
                  <strong>Servings:</strong> {recipe?.servings}
                </div>
              </div>

              {/* Ingredients */}
              <div className="mb-4">
                <h2 className="text-2xl font-semibold mb-2">Ingredients</h2>
                <ul className="list-disc list-inside ml-2">
                  {recipe?.ingredients?.map((ingredient, index) => (
                    <li key={index}>
                      {ingredient.quantity} {ingredient.name}
                    </li>
                  )) || <p>Not found</p>}
                </ul>
              </div>

              {/* Instructions */}
              <div className="mb-4">
                <h2 className="text-2xl font-semibold mb-2">Instructions</h2>
                <ol className="list-decimal list-outside ml-6">
                  {recipe?.instructions?.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                  )) || <p>No instructions available</p>}
                </ol>
              </div>

              {/* Tags */}
              <div className="mb-4">
                <h2 className="text-2xl font-semibold mb-2">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {recipe?.tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="py-2 px-4 font-medium text-sm rounded-full shadow-md hover:shadow-lg transition duration-300 bg-blue-100 text-blue-900"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Likes and Comments */}
              <div className="flex flex-col">
                <div className="flex gap-8">
                  <div className="flex gap-2 items-center mr-4">
                    <button onClick={handleLike} disabled={!isAuthenticated}>
                      {userLiked ? (
                        <FaHeart className=" h-6 w-6 text-red-500 cursor-pointer hover:text-gray-600" />
                      ) : (
                        <FaRegHeart className=" h-6 w-6 text-gray-600 cursor-pointer hover:text-red-500" />
                      )}
                    </button>
                    <span className="text-gray-600">
                      {recipe?.recipeLikeCount} Likes
                    </span>
                  </div>
                  <div className="flex gap-2 items-center mr-4">
                    <button>
                      <HiOutlineChatBubbleOvalLeftEllipsis className=" h-6 w-6 text-gray-600 cursor-pointer hover:text-red-500" />
                    </button>
                    <span className="text-gray-600">
                      {recipe?.comments?.length} Comments
                    </span>
                  </div>
                </div>

                <div>
                  <span className="text-gray-600">
                    <CommentSection
                      key={recipe?._id}
                      comments={recipe?.comments}
                      recipeID={recipe?._id}
                    />
                  </span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ViewRecipe;
