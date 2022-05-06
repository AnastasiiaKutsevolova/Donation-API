const { Router } = require("express");
const User = require("../models/user");
const auth = require("../middleware/auth.middleware");
const { sanitizedObj } = require("../utils");

const router = Router();
// Find user
router.get("/user", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }

    res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ error });
  }
});

// User update
router.put("/user", auth, async (req, res) => {
  try {
    const { name, password } = req.body;

    const user = {
      name,
      password,
    };

    const updatedUser = await User.findByIdAndUpdate(
      req.user.userId,
      sanitizedObj(user),
      { new: true } // returns the new document
    );

    res.status(200).json({ user: updatedUser });
  } catch (error) {
    return res.status(500).json({ error });
  }
});

// Delete User
router.delete("/user/:id", auth, async (req, res) => {
  try {
    // TODO remove associated posts
    await User.findByIdAndDelete(req.params.id);

    res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error });
  }
});

module.exports = router;
