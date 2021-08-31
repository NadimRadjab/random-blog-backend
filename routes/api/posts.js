const express = require("express");
const router = express.Router();
const Post = require("../../models/post");
const User = require("../../models/user");

router.get("/", async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});

router.post("/", async (req, res) => {
  const { name, text } = req.body;
  const post = new Post({ name, text });
  // post.author = req.user.id;
  const newPost = await post.save();
  res.json(newPost);
});
router.post("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findByIdAndUpdate(id, { ...req.body });
    res.json({ succsess: true });
  } catch (e) {
    res.status(400).json({ succsess: false });
  }
});
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findByIdAndDelete(id);
    res.json({ succsess: true });
  } catch (e) {
    res.status(400).json({ succsess: false });
  }
});

module.exports = router;
