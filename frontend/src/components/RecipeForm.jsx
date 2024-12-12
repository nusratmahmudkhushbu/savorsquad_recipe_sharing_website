import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import { apiStart } from "../../api";
import { useNavigate } from "react-router-dom";
import FileUpload from "./RPupload";

const RecipeForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { userObj } = useAuth();
 
  const [recipe, setRecipe] = useState({
    name: "",
    category: "",
    instructions: [""],
    tags: [""],
    ingredients: [{ name: "", quantity: "" }],
    prepTime: "",
    cookTime: "",
    servings: "",
    difficulty: "",
    photo: "http://localhost:5001/recipepictures/default.jpg",
  }); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe((prev) => ({ ...prev, [name]: value }));
  };

  const handleIngredientChange = (index, e) => {
    const { name, value } = e.target;
    const ingredients = [...recipe.ingredients];
    ingredients[index][name] = value;
    setRecipe((prev) => ({ ...prev, ingredients }));
  };

  const addIngredient = () => {
    setRecipe((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, { name: "", quantity: "" }],
    }));
  };

  const removeIngredient = (index) => {
    const ingredients = recipe.ingredients.filter((_, i) => i !== index);
    setRecipe((prev) => ({ ...prev, ingredients }));
  };

  const handleInstructionChange = (index, e) => {
    const { value } = e.target;
    const instructions = [...recipe.instructions];
    instructions[index] = value;
    setRecipe((prev) => ({ ...prev, instructions }));
  };

  const addInstruction = () => {
    setRecipe((prev) => ({
      ...prev,
      instructions: [...prev.instructions, ""],
    }));
  };

  const removeInstruction = (index) => {
    const instructions = recipe.instructions.filter((_, i) => i !== index);
    setRecipe((prev) => ({ ...prev, instructions }));
  };

  const handleTagChange = (index, e) => {
    const { value } = e.target;
    const tags = [...recipe.tags];
    tags[index] = value;
    setRecipe((prev) => ({ ...prev, tags }));
  };

  const addTag = () => {
    setRecipe((prev) => ({
      ...prev,
      tags: [...prev.tags, ""],
    }));
  };

  const removeTag = (index) => {
    const tags = recipe.tags.filter((_, i) => i !== index);
    setRecipe((prev) => ({ ...prev, tags }));
  };

  const updatePhoto = (newPhotoUrl) => {
    const correctedUrl = newPhotoUrl.replace("public", "").replace(/\\/g, "/");
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      photo: `${apiStart}${correctedUrl}`,
    }));
    console.log(`${apiStart}/${correctedUrl}`)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(recipe);
    // Submit the form data to the server or handle it as needed
    try {
      setIsLoading(true);
      const response = await axios.post(`${apiStart}/api/recipe/create`, {
        ...recipe,
        createdBy: userObj._id,
      });
      console.log(response.data);
      navigate("/userprofile");
    } catch (error) {
      console.log(error.message || "Error creating recipe");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-10 max-w-4xl mx-auto p-6 shadow-lg rounded-lg bg-white"
    >
      <h2 className="text-2xl font-bold flex items-center justify-center px-4 py-4 sm:px-10 lg:col-span-6 lg:px-14 lg:py-10 xl:col-span-6">
        Create Recipe
      </h2>

      <div className="mb-4 flex gap-6 items-start">
        <div>
          <div>
            {recipe.photo ? (
              <img
                src={recipe.photo}
                alt="Recipe"
                className="h-80 w-80 rounded-md object-cover mb-4"
              />
            ) : (
              <span className="inline-block h-80 w-80 overflow-hidden bg-gray-100 mb-4">
                <svg
                  className="h-full w-full text-gray-300"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 0H0v24h24V0z" fill="none" />
                  <path
                    fillRule="evenodd"
                    d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="photo"
              className="block text-sm font-medium text-gray-700"
            >
              Photo URL
            </label>
            <FileUpload photolink={updatePhoto}/>
            {/* <input
              type="text"
              id="photo"
              name="photo"
              placeholder="Enter Image URL"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
              value={recipe.photo}
              onChange={handleChange}
            /> */}

          </div>
        </div>

        <div className="flex-1">
          <div className="mb-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Recipe Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={recipe.name}
              placeholder="Recipe name"
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="tags"
              className="block text-sm font-medium text-gray-700"
            >
              Tags
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {recipe.tags.map((tag, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    name={`tag${index}`}
                    value={tag}
                    placeholder="Enter Tag"
                    onChange={(e) => handleTagChange(index, e)}
                    className="w-32 px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                    required
                  />

                  <button
                    type="button"
                    onClick={() => removeTag(index)}
                    className="text-sm text-red-600 hover:text-red-900"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="size-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                  </button>
                </div>
              ))}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={addTag}
                  className="text-teal-600 hover:text-teal-900 text-sm"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="size-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </button>
                <span className="text-gray-500 text-sm"></span>
              </div>
            </div>
          </div>

          <div className="mb-4 flex gap-4">
            <div className="flex-1">
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Category
              </label>
              <select
                name="category"
                id="category"
                value={recipe.category}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                required
              >
                <option value="">Select category</option>
                <option value="Entrees">Entrees</option>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Sides">Sides</option>
                <option value="Desserts">Desserts</option>
                <option value="Drinks">Drinks</option>
              </select>
            </div>

            <div className="flex-1">
              <label
                htmlFor="difficulty"
                className="block text-sm font-medium text-gray-700"
              >
                Difficulty
              </label>
              <select
                name="difficulty"
                id="difficulty"
                value={recipe.difficulty}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                required
              >
                <option value="">Select difficulty</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="prepTime"
              className="block text-sm font-medium text-gray-700"
            >
              Prep Time
            </label>
            <input
              type="text"
              name="prepTime"
              id="prepTime"
              placeholder="Enter prep time"
              value={recipe.prepTime}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="cookTime"
              className="block text-sm font-medium text-gray-700"
            >
              Cook Time
            </label>
            <input
              type="text"
              name="cookTime"
              id="cookTime"
              placeholder="Enter cook time"
              value={recipe.cookTime}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="servings"
              className="block text-sm font-medium text-gray-700"
            >
              Servings
            </label>
            <input
              type="number"
              name="servings"
              id="servings"
              placeholder="Select servings"
              value={recipe.servings}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
              required
            />
          </div>
        </div>
      </div>

      <div className="mb-4">
        <label
          htmlFor="ingredients"
          className="block text-sm font-medium text-gray-700"
        >
          Ingredients
        </label>
        {recipe.ingredients.map((ingredient, index) => (
          <div key={index} className="flex gap-4 items-center mb-2">
            <input
              type="text"
              name="name"
              value={ingredient.name}
              placeholder="Ingredient name"
              onChange={(e) => handleIngredientChange(index, e)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
              required
            />
            <input
              type="text"
              name="quantity"
              value={ingredient.quantity}
              placeholder="Quantity"
              onChange={(e) => handleIngredientChange(index, e)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
              required
            />
            <button
              type="button"
              onClick={() => removeIngredient(index)}
              className="text-sm text-red-600 hover:text-red-900"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </button>
          </div>
        ))}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={addIngredient}
            className="text-teal-600 hover:text-teal-900 text-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="mb-4">
        <label
          htmlFor="instructions"
          className="block text-sm font-medium text-gray-700"
        >
          Instructions
        </label>
        {recipe.instructions.map((instruction, index) => (
          <div key={index} className="flex gap-4 items-center mb-2">
            <input
              type="text"
              name={`instruction${index}`}
              value={instruction}
              placeholder="Enter Instruction"
              onChange={(e) => handleInstructionChange(index, e)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
              required
            />
            <button
              type="button"
              onClick={() => removeInstruction(index)}
              className="text-sm text-red-600 hover:text-red-900"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </button>
          </div>
        ))}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={addInstruction}
            className="text-teal-600 hover:text-teal-900 text-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="text-right">
        <button
          type="submit"
          disabled={isLoading}
          className="inline-block px-6 py-2 text-white bg-teal-600 hover:bg-teal-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-opacity-50"
        >
          {isLoading ? "Creating Recipe..." : "Submit Recipe"}
        </button>
      </div>
    </form>
  );
};

export default RecipeForm;
