if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const mongoose = require("mongoose");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");

const cors = require("cors");
const app = express();

const db = process.env.DB_URL;

const postsRouter = require("./routes/api/posts");
const authRouter = require("./routes/api/auth");
const commentRouter = require("./routes/api/comments");
const userRouter = require("./routes/api/user");

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
app.use(helmet());
app.use(mongoSanitize());

app.use("/api/posts", cors(), postsRouter);
app.use("/api/auth", cors(), authRouter);
app.use("/api/posts", commentRouter);
app.use("/api/user", cors(), userRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
