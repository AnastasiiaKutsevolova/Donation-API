const { Router } = require("express");
const router = Router();
const auth = require("../middleware/auth.middleware");

const Volunteer = require("../models/volunteer");

router.get("/volunteer", async (req, res) => {
  try {
    const volunteers = await Volunteer.find({});
    return res.json({ volunteers });
  } catch {
    res.status(400).json({ message: "Error" });
  }
});

router.post("/volunteer", auth, (req, res) => {
  const volunteerPost = new Volunteer();

  volunteerPost.name = req.body.name;
  volunteerPost.email = req.body.email;
  volunteerPost.about = req.body.about;

  volunteerPost.save(function (err) {
    if (err) {
      console.log(err);
      return;
    }

    res.status(201).json({ message: "success" });
  });
});

module.exports = router;
