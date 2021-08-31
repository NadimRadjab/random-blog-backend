const express = require("express");
const router = express.Router();
const Post = require("../../models/post");
const Comment = require("../../models/comment");

//Create a comment
router.post("/:id/comments", async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  const newComment = new Comment(req.body);
  post.comments.push(newComment);
  const comment = await newComment.save();
  await post.save();
  res.json(comment);
});

//Delete a comment
router.delete("/:id/comments/:commentId", async (req, res) => {
  const { id, commentId } = req.params;
  try {
    await Post.findByIdAndUpdate(id, { $pull: { comments: commentId } });
    await Comment.findByIdAndDelete(commentId);
    res.json({ success: true });
  } catch (e) {
    res.status(400).json({ success: false });
  }
});
module.exports = router;
