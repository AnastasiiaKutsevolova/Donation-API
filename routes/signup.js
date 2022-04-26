const express = require("express");
const { Router } = require("express");
const router = Router();

// Bring in User Model
const User = require("../models/user");

// Signup Form
router.get("/signup", async (req, res) => {
  try {
    const users = await User.find({});
    return res.json({ users });
  } catch {
    res.status(400).json({ message: "Error" });
  }
});

router.post("/signup", (req, res) => {
  const userPost = new User();

  userPost.name = req.body.name;
  userPost.email = req.body.email;
  userPost.password = req.body.password;

  userPost.save(function (err) {
    if (err) {
      console.log(err);
      return;
    }

    res.status(201).json({ message: "success" });
  });
});

module.exports = router;
