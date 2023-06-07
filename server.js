require("dotenv").config();

const express = require("express");

const cors = require("cors");

const mongoose = require("mongoose");

//express app
const app = express();

//middlewares

app.use(
  cors({
    credentials: true,
  })
);

app.use(express.json());

//routes
app.get("/", (req, res) => {
  res.status(200).json({ message: " Welcome to tormack server!" });
});

const port = process.env.PORT || 8080;
const url = process.env.MONGO_URL;

//mongoose

mongoose.connect(url, { useUnifiedTopology: true }).then(() => {
  app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });
});
