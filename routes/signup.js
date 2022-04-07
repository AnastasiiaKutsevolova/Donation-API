const { Router } = require("express");
const router = Router();

router.post("/signup", (req, res) => {
  const user = req.body;

  if (!user.name || !user.email || !user.password) {
    return res.status(400).json({ message: "input should not be empty" });
  }

  res.send("success");
});

module.exports = router;
