const { Router } = require("express");
const router = Router();

router.get("/signup", (req, res) => {
  res.render("auth/layout", {
    name: true,
  });
});

router.post("/signup", (req, res) => {
  console.log("Body :", req.body);
});

module.exports = router;
