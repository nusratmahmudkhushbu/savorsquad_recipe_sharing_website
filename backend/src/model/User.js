const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    photo: {
      type: String,
      default: "/profilepictures/default.avif",
    },

    bio: {
      type: String,
      default: "",
    },

    role: {
      type: String,
      default: "customer",
    },
    bookmarks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recipe", // Assuming 'Recipe' is another model
      },
    ],
    UserLikeCount: {
      type: Number,
      default: 0,
    },

    creditPoints: {
      type: Number,
      default: 0,
    },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
