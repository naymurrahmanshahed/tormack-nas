const express = require("express");

const {
  signupUser,
  loginUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
} = require("../controllers/user");
const authMiddleware = require("../middlewares/auth.middleware");

//router
const router = express.Router();

//login route

router.post("/login", loginUser);

//signup route
router.post("/signup", signupUser);

//get an User
router.get("/:userId", authMiddleware, getUser);

//get all user
router.get("/all", authMiddleware, getUsers);

//update an user
router.patch("/:userId", authMiddleware, updateUser);

//delete an user
router.delete("/:userId", authMiddleware, deleteUser);

module.exports = router;
