const express = require("express");
const router = express.Router();
const Post = require("../../models/post");
const auth = require("../../middleware/auth");

//Get
router.get("/", async (req, res) => {
  const posts = await Post.find({});
  res.json(posts);
});

//Get single Post
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id).populate("comments");
  if (!post) res.status(404).json({ msg: "Post does not exist!" });
  res.json(post);
});
//Create
router.post("/", auth, async (req, res) => {
  const { name, text } = req.body;
  const post = new Post({ name, text });
  post.author = req.user.id;
  const newPost = await post.save();
  res.json(newPost);
});
//Update
router.post("/:id", auth, async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findByIdAndUpdate(id, { ...req.body });
    res.json({ succsess: true });
  } catch (e) {
    res.status(400).json({ succsess: false });
  }
});
router.delete("/:id", auth, async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findByIdAndDelete(id);
    res.json({ succsess: true });
  } catch (e) {
    res.status(400).json({ succsess: false });
  }
});

module.exports = router;
