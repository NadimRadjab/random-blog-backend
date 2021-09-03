const express = require("express");
const router = express.Router();
const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../config");
const auth = require("../../middleware/auth");

//Register User
router.post("/register", auth, async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields1" });
  }
  const user = await User.findOne({ email });
  if (user) res.status(400).json({ msg: "User alrady exits" });

  const newUser = new User({ username, email, password });

  //Create salt and hash
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser.save().then((user) => {
        jwt.sign(
          {
            id: user.id,
          },

          JWT_SECRET,
          { expiresIn: 3600 },
          (err, token) => {
            if (err) throw err;
            res.json({
              token,
              user: {
                id: user.id,
                username: user.username,
                email: user.email,
              },
            });
          }
        );
      });
    });
  });
});

//Login User
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ msg: "Please enter all fields!" });
  }
  const user = await User.findOne({ username });
  if (!user) res.status(400).json({ msg: "User does not exits" });

  //Compare password
  bcrypt.compare(password, user.password).then((isMatch) => {
    if (!isMatch) res.status(400).json({ msg: "Invalid credentials" });

    jwt.sign(
      { id: user.id },
      JWT_SECRET,
      { expiresIn: 3600 },

      (err, token) => {
        if (err) throw err;
        res.json({
          token,
          user: {
            _id: user.id,
            username: user.username,
            email: user.email,
          },
        });
      }
    );
  });
});
module.exports = router;
