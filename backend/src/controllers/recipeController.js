const Recipe = require("../model/RecipeModel");

const User = require("../model/User");

const createRecipe = async (req, res) => {
  try {
    const {
      name,
      category,
      instructions,
      tags,
      ingredients,
      prepTime,
      cookTime,
      servings,
      difficulty,
      photo,
      createdBy,
    } = req.body;

    const newRecipe = new Recipe({
      name,
      category,
      instructions,
      tags,
      ingredients,
      prepTime,
      cookTime,
      servings,
      difficulty,
      photo,
      comments: [],
      createdBy,
      likedUsers: [],
    });

    await newRecipe.save();

    res.status(201).json({
      success: true,
      message: "Recipe created successfully",
      data: newRecipe,
    });
  } catch (error) {
    console.error("Error creating recipe:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

const getAllRecipes = async (req, res) => {
  const { createdBy } = req.body;
  try {
    const recipes = await Recipe.find({ createdBy });
    res.status(200).json(recipes);
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

const getCategory = async (req, res) => {
  const { category } = req.params;
  console.log(`Fetching data for category: ${category}`);

  try {
    const recipes = await Recipe.find({ category });
    console.log(`Items found: ${recipes.length}`);
    if (recipes.length === 0) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json(recipes);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getSearchedRecipe = async (req, res) => {
  const { q } = req.params;
  console.log("search working");
  try {
    let recipes = [];
    if (q) {
      recipes = await Recipe.find({ name: { $regex: q, $options: "i" } });
    }
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: "No items found!" });
  }
};

const addComment = async (req, res) => {
  const { recipeID } = req.body;
  const { comment } = req.body;
  const { userId } = req.body;

  try {
    const recipe = await Recipe.findById(recipeID);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    const newComment = {
      commentedBy: userId,
      comment,
    };

    recipe.comments.push(newComment);
    await recipe.save();

    res.status(201).json({
      success: true,
      message: "Comment added successfully",
      data: newComment,
    });
  } catch (error) {
    console.error("Error adding comment:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

const addLike = async (req, res) => {
  const { recipeID, userId } = req.body;

  try {
    const recipe = await Recipe.findById(recipeID);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    const existingUserIndex = recipe.likedUsers.findIndex(
      (likedUserId) => likedUserId.toString() === userId
    );

    if (existingUserIndex !== -1) {
      // User has already liked, so remove the like
      recipe.likedUsers.splice(existingUserIndex, 1);
      recipe.recipeLikeCount = (recipe.recipeLikeCount || 1) - 1;
    } else {
      // User hasn't liked, so add the like
      recipe.likedUsers.push(userId);
      recipe.recipeLikeCount = (recipe.recipeLikeCount || 0) + 1;
    }

    await recipe.save();

    return res.status(200).json({
      success: true,
      message: "Like operation handled successfully",
      likeCount: recipe.recipeLikeCount,
    });
  } catch (error) {
    console.error("Error adding/removing like:", error.message);
    res.status(500).json({
      success: false,
      message: "Like operation error",
      error: error.message,
    });
  }
};

const getRecipe = async (req, res) => {
  const { id } = req.params;

  try {
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return res
        .status(404)
        .json({ success: false, message: "recipe not found" });
    }

    res.status(200).json({
      success: true,
      message: "recipe fetched successfully",
      data: recipe,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};
const getMostLikedRecipe = async (req, res) => {
  try {
    const mostLikedRecipe = await Recipe.findOne()
      .sort({ recipeLikeCount: -1 })
      .limit(1)
      .select("-comments")
      .populate("createdBy", "username");

    if (!mostLikedRecipe) {
      return res.status(404).json({
        success: false,
        message: "No recipes found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Most liked recipe fetched successfully",
      data: mostLikedRecipe,
    });
  } catch (error) {
    console.error("Error fetching most liked recipe:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
const getLatestRecipes = async (req, res) => {
  try {
    const latestRecipes = await Recipe.find()
      .sort({ _id: -1 })
      .limit(4)
      .select("-comments")
      .populate("createdBy", "username");

    if (latestRecipes.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No recipes found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Latest recipes fetched successfully",
      data: latestRecipes,
    });
  } catch (error) {
    console.error("Error fetching latest recipes:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

const showallrecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find().populate("createdBy", "username email");
    res.status(200).json(recipes);
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

const adeleterecipe = async (req, res) => {
  const delrecipeId = req.params.id;
  const userId = req.user.id;

  try {
    const loggedInUser = await User.findById(userId);

    if (!loggedInUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (loggedInUser.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    const recipetodelete = await Recipe.findByIdAndDelete(delrecipeId);

    if (!recipetodelete) {
      return res.status(404).json({ message: "Recipe to delete not found" });
    }

    res.json({
      success: true,
      message: "Recipe deleted successfully",
      recipe: recipetodelete,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = {
  showallrecipes,
  createRecipe,
  getAllRecipes,
  getCategory,
  getSearchedRecipe,
  addComment,
  addLike,
  getRecipe,
  getMostLikedRecipe,
  getLatestRecipes,
  adeleterecipe,
};
