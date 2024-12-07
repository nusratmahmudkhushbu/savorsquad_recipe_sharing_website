const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");


const multer = require("multer");
const path = require("path");

const User = require("../model/User");

const beapistart = "http://localhost:5000";

const feapistart = "http://localhost:5173";

//GET USER DATA

const getallusers = async (req, res) => {
  try {
    const users = await User.find({}, "-password");

    res
      .status(200)
      .json({ success: true, message: "all users fetched", data: users });
  } catch (error) {
    res.status(404).json({ success: false, message: "Not Found" });
  }
};

const getUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id).select("-password");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

const getmyuser = async (req, res) => {
  const id = req.user.id;

  try {
    const user = await User.findById(id).select("-password");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// Create new user
const createUser = async (req, res) => {
  const { username, email, password } = req.body;

  console.log(`New user:
    Email: ${email},
    username:${username},
    password:${password},
    `);

  try {
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Username or email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id, role: newUser.role }, "secret", {
      expiresIn: "24h",
    });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: newUser,
      token: token,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// Login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  console.log(email, password);

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      console.log("User not found");
      return res.status(400).json({ success: false, message: "Invalid email" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Password does not match");
      return res
        .status(400)
        .json({ success: false, message: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, "secret", {
      expiresIn: "24h",
    });

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      token,
    });
  } catch (error) {
    console.error("Error in loginUser:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

//  Verfication email
const sendverifyemail = async (req, res) => {
  console.log("Sending Verification Email");

  const id = req.user.id;

  try {
    const user = await User.findById(id).select("-password");
    if (!user) {
      console.log("User not found");
      return res.status(400).json({ success: false, message: "Invalid email" });
    }

    const verifytoken = jwt.sign(
      { id: user._id, role: user.role },
      "emailverify",
      {
        expiresIn: "24h",
      }
    );

    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: "nusrat.mahmud@g.bracu.ac.bd",
        pass: "rrdxsoiihsmedbbg",
      },
    });

    const mailOptions = {
      from: "nusrat.mahmud@g.bracu.ac.bd",
      to: user.email,
      subject: "Email Verification for Recipe",
      text: `Step-1 of you recipe building experience is to get verified. Click below: 
      ${feapistart}/verify-email?token=${verifytoken}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Email sent: " + info.response);
    });

    res.json({ success: true, message: "Verification sent", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const verifyemail = async (req, res) => {
  console.log("VERIFYING");
  const { token } = req.query;

  if (!token) {
    return res.status(400).send("Verification token is missing");
  }

  try {
    const decoded = jwt.verify(token, "emailverify");
    const id = decoded.id;

    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(400).send("User not found");
    }

    if (user.isVerified) {
      return res.status(400).send("User already verified");
    }

    user.isVerified = true;

    await user.save();

    res.status(200).send("Email verified successfully");
  } catch (error) {
    res.status(400).send("Invalid or expired token");
  }
};

// Forget password
const sendforgeturl = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    const token = jwt.sign({ id: user._id }, "I_forgOt", { expiresIn: "1h" });

    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: "nusrat.mahmud@g.bracu.ac.bd",
        pass: "rrdxsoiihsmedbbg",
      },
    });

    const mailOptions = {
      from: "nusrat.mahmud@g.bracu.ac.bd",
      to: user.email,
      subject: "Password Reset Link",
      text: `Click the following link to reset your password: ${feapistart}/forget-password?token=${token}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res
          .status(500)
          .json({ success: false, message: "Error sending email", error });
      }
      res
        .status(200)
        .json({ success: true, message: "Password reset link sent" });
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

const resetPassword = async (req, res) => {
  const { token, password } = req.body;

  try {
    const decoded = jwt.verify(token, "I_forgOt");
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid token" });
    }

    // console.log(user)

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    console.log("USER password changed");
    res
      .status(200)
      .json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Invalid or expired token", error });
  }
};

//Edit Users
const editUser = async (req, res) => {
  const { username, bio, photo } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { username, bio, photo },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ success: true, message: "Profile updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
//upload profile picture
const PPstorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/profilepictures");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${req.user.id}${ext}`);
  },
});

const PPupload = multer({
  storage: PPstorage,
  limits: { fileSize: 25 * 1024 * 1024 }, 
});

const uploadProfilepicture = async (req, res) => {
  try {
    const photoUrl = `/profilepictures/${req.file.filename}`;

    await User.findByIdAndUpdate(req.user.id, { photo: photoUrl });

    res.json({ success: true, photo: photoUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
}

const deleteUser = async (req, res) => {
  const { id } = req.body;

  try {
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

const adeleteUser = async (req, res) => {
  const deluserId = req.params.id; 
  const userId = req.user.id; 

  try {
    const loggedInUser = await User.findById(userId);

    if (!loggedInUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (loggedInUser.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" }); 
    }

    const userToDelete = await User.findByIdAndDelete(deluserId);

    if (!userToDelete) {
      return res.status(404).json({ message: "User to delete not found" });
    }

    res.json({ success: true, message: "User deleted successfully", user: userToDelete });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};


module.exports = {
  getallusers,
  getUser,
  getmyuser,

  createUser,

  loginUser,

  sendverifyemail,
  verifyemail,

  sendforgeturl,
  resetPassword,

  editUser,
  PPupload,
  uploadProfilepicture,
  
  deleteUser,

  adeleteUser,
};
