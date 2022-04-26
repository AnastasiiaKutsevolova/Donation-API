const { Router } = require("express");
const router = Router();

const User = require("../models/user");

router.get("/login", async (req, res) => {
  try {
    const user = await User.find({});
    return res.json({ user });
  } catch {
    res.status(400).json({ message: "Error" });
  }
});

router.post("/signup", (req, res) => {
  const userPost = new User();

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
