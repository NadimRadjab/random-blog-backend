const express = require("express");
const router = express.Router();
const User = require("../../models/user");

res.get("/user", async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
});

module.exports = router;
