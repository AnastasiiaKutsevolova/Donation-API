const { Router } = require("express");
const router = Router();

router.get("/about", (req, res) => {
  res.render("about/layout", {
    active: true,
  });
});

module.exports = router;
