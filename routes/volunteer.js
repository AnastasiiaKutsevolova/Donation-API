const { Router } = require("express");
const router = Router();

const Volunteer = require("../models/volunteer");

router.get("/volunteer", (req, res) => {
  res.render("volunteer/layout", {
    name: true,
  });
});

router.post("/volunteer", (req, res) => {
  const volunteerPost = new Volunteer();

  volunteerPost.name = req.body.name;
  volunteerPost.email = req.body.email;
  volunteerPost.about = req.body.about;

  volunteerPost.save(function (err) {
    if (err) {
      console.log(err);
      return;
    } else {
      res.redirect("/volunteer/find");
    }
  });
});

module.exports = router;
