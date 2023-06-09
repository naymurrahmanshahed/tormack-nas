const express = require("express");

const authMiddleware = require("../middlewares/auth.middleware");
const { getDevice } = require("../controllers/device");
//router
const router = express.Router();

//get device data

router.get("/:userId", authMiddleware, getDevice);

module.exports = router;
