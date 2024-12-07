const express = require("express");
const router = express.Router();

const multer = require("multer");
const path = require("path");

const {
  getallusers,
  getUser,
  getmyuser,

  createUser,

  loginUser,

  deleteUser,
  sendverifyemail,
  verifyemail,

  sendforgeturl,
  resetPassword,

  editUser,
  PPupload,
  uploadProfilepicture,
  adeleteUser,
} = require("../controllers/UserController");

const verifyToken = require("../controllers/middleware/authMiddleware");

// get
router.get("/all", getallusers);
router.get("/one/:id", getUser);

//authorization
router.get("/my", verifyToken, getmyuser);
router.post("/login", loginUser);

router.get("/verify-email", verifyemail);
router.get("/send-verify-email", verifyToken, sendverifyemail);

// create
router.post("/create", createUser);

// update
router.post("/update", verifyToken, editUser);

router.post("/upload-profile-picture", verifyToken, PPupload.single("photo"), uploadProfilepicture);


router.post("/send-forget-password",sendforgeturl);
router.post("/reset-password",resetPassword);

//uploadpicture

// delete

router.post("/delete", verifyToken, deleteUser);

//admin only
router.delete("/adelete/:id", verifyToken, adeleteUser)

module.exports = router;
