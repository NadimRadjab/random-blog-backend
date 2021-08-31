const express = require("express");
const mongoose = require("mongoose");

const app = express();

const db = "mongodb://localhost:27017/blog-api";

mongoose
  .connect(db, {
    useNewUrlParser: true,

    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Mongo connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
