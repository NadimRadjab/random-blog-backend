const express = require("express");
const router = express.Router();
const User = require("../../models/user");
const auth = require("../../middleware/auth");

router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
});

module.exports = router;
