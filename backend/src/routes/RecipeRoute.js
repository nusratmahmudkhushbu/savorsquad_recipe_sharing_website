const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path');


const verifyToken = require("../controllers/middleware/authMiddleware");
const {
  createRecipe,
  getAllRecipes,
  getCategory,
  getSearchedRecipe,
  addComment,
  addLike,
  getRecipe,
  getMostLikedRecipe,
  getLatestRecipes,
  showallrecipes,
  adeleterecipe
} = require("../controllers/recipeController");


const RPstorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/recipepictures");
  },
  filename: (req, file, cb) => {
    const date = new Date();
    const datePrefix = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}_${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;
    const ext = path.extname(file.originalname);
    cb(null, `${datePrefix}_${file.originalname}${ext}`);
  },
});

const RPupload = multer({
  storage: RPstorage,
  limits: { fileSize: 25 * 1024 * 1024 }, 
});

router.post("/upload", RPupload.single("image"), (req, res) => {
  console.log("UPLOADING")
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  // File information can be accessed via req.file
  res.status(200).send({
    message: 'File uploaded successfully!',
    file: req.file
  });
});

// Create a recipe
router.post("/create", createRecipe);

router.post("/userRecipes", getAllRecipes);

//fetch all recipes in a certain category
router.get("/all", showallrecipes);

router.get("/category/:category", getCategory);

router.get("/search/:q", getSearchedRecipe);

router.post("/comments", addComment);

router.post("/addlike", addLike);

router.get("/one/:id", getRecipe);

router.get("/mostLikedRecipe", getMostLikedRecipe);

router.get("/latestRecipes", getLatestRecipes);

router.delete("/adelete/:id", verifyToken, adeleterecipe);

module.exports = router;
