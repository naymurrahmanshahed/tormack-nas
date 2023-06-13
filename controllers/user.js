const jwt = require("jsonwebtoken");

const User = require("../models/user");

const mongoose = require("mongoose");

//jwt token
const createToken = (_id) => {
  //create new token
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// signup user

const signupUser = async (req, res) => {
  const { name, username, email, password } = req.body;
  const ipAddress =
    req.headers["x-forward-for"] || req.connection.remoteAddress;

  try {
    const user = await User.signup(name, username, email, password, ipAddress);

    //create a token

    const token = createToken(user._id);

    //set the token as a cookie
    res.cookie("token", token, {
      //must be milisecond
      maxAge: 86400 * 1000,
      httpOnly: true,
      secure: true,
    });

    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//login user

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const ipAddress =
    req.headers["x-forward-for"] || req.connection.remoteAddress;

  try {
    const user = await User.login(email, password, ipAddress);

    //create a token
    const token = createToken(user._id);

    //clear previous cookie
    res.clearCookie("token");

    //set the token as a cookie

    res.cookie("token", token, {
      maxAge: 86400 * 1000,
      httpOnly: true,
      secure: true,
    });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//get all users
const getUsers = async (req, res) => {
  try {
    const users = User.find({});
    if (!users) {
      throw Error("Users not found.");
    }
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

//get an user

const getUser = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw Error("User not found.");
    }
    if (userId !== req.user?._id.toString()) {
      throw Error("Unauthorized access");
    }
    const user = await User.findById(userId);

    if (!user) {
      throw Error("User not found.");
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

//update user

const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name } = req.body;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw Error("User not found.");
    }

    if (userId !== req.user?._id.toString()) {
      throw Error("Unauthorized access.");
    }

    if (!name) {
      throw Error("Name field must be filled");
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: { name } },
      { new: true }
    );
    if (!user) {
      throw Error("User Not Found");
    }
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

//delete an user

const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw Error("Uniauthorized access.");
    }

    if (userId !== req.user?._id.toString()) {
      throw Error("Unauthorized access.");
    }
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      throw Error("User not found.");
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

module.exports = {
  signupUser,
  loginUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
};
