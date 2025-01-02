import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiStart } from "../../api";
import PostCard from "./Postcard";

const LatestRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLatestRecipes = async () => {
      try {
        const response = await axios.get(
          `${apiStart}/api/recipe/latestRecipes`
        );

        if (response.data.success) {
          setRecipes(response.data.data);
        } else {
          setError("Failed to fetch recipes");
        }
      } catch (error) {
        console.error("Error fetching latest recipes:", error);
        setError("An error occurred while fetching recipes");
      } finally {
        setLoading(false);
      }
    };

    fetchLatestRecipes();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading latest recipes...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 pt-8 pb-4">
      <h2 className="text-4xl text-[#2A3342] font-bold mb-6">Latest Recipes</h2>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 md:gap-x-4 lg:grid-cols-3 lg:gap-x-4 xl:grid-cols-4 gap-x-4 gap-y-8 mx-auto">
        {recipes.map((recipe) => (
          <PostCard
            key={recipe._id}
            recipeID={recipe._id}
            imageUrl={recipe.photo}
            likesCount={recipe.recipeLikeCount}
            caption={recipe.name}
            preptime={recipe.prepTime}
            category={recipe.category}
            servings={recipe.servings}
            cooktime={recipe.cookTime}
            difficulty={recipe.difficulty}
            instructions={recipe.instructions}
            comments={recipe.comments}
            ingredients={recipe.ingredients}
            tags={recipe.tags}
            createdBy={recipe.createdBy}
            likeArray={recipe.likedUsers}
          />
        ))}
      </div>
    </div>
  );
};

export default LatestRecipes;
