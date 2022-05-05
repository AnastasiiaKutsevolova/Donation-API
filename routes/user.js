const { Router } = require("express");
const User = require("../models/user");
const auth = require("../middleware/auth.middleware");
const { route } = require("./auth");

const router = Router();
// Find user
router.get("/user/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }

    res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ error });
  }
});

// User update
router.put("/user/:id", auth, async (req, res) => {
  try {
    const { name, password } = req.body;

    const user = {
      name,
      password,
    };

    // Filtering empty values
    const sanitizedUser = Object.keys(user).reduce(
      (acc, key) => (user[key] ? { ...acc, [key]: user[key] } : acc),
      {}
    );

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      sanitizedUser
    );

    res.status(200).json({ user: updatedUser });
  } catch (error) {
    return res.status(500).json({ error });
  }
});

// Delete User
router.delete("/user/:id", auth, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error });
  }
});

module.exports = router;
