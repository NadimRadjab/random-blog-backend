const express = require("express");
const mongoose = require("mongoose");

const app = express();

const db = "mongodb://localhost:27017/blog-api";

const postsRouter = require("./routes/api/posts");
const authRouter = require("./routes/api/auth");
const commentRouter = require("./routes/api/comments");

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

app.use("/api/posts", postsRouter);
app.use("/api/auth", authRouter);
app.use("/api/posts", commentRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
