const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const User = require("../models/user");

const router = Router();

router.post(
  "/signup",
  [
    check("name", "Requires minimum 1 character").isLength({ min: 1 }),
    check("email", "Invalid email").isEmail(),
    check("password", "Requires minimum 1 digits").isLength({ min: 1 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "invalid registration data",
        });
      }
      const { name, email, password } = req.body;

      const candidate = await User.findOne({ email });

      if (candidate) {
        return res.status(400).json({ message: "User already exist!" });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({
        name,
        email,
        password: hashedPassword,
      });

      await user.save();

      res.status(201).json({ message: ` ${name} user has been created` });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong..." });
    }
  }
);

// Create Route Login

router.post(
  "/login",
  [
    check("email", "Email invalid").normalizeEmail().isEmail(),
    check("password", "Password invalid").exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Invalid credentials",
        });
      }
      const { email, password } = req.body;

      console.log("email", email);

      const user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ message: "invalid user name or password!" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ message: "Invalid user name or password" });
      }

      const token = jwt.sign(
        {
          userId: user.id,
        },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );

      res.json({ token, userId: user.id });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong...", error });
    }
  }
);

module.exports = router;
