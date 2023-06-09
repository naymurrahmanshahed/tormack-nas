const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema({
  ip_address: {
    type: String,
    required: true,
  },
  hostname: {
    type: String,
    required: true,
  },
  os: {
    type: String,
    required: true,
  },
  user_agent: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Device", deviceSchema);
