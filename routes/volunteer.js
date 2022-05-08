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
  volunteerPost.author = req.user.userId;

  volunteerPost.save(function (err) {
    if (err) {
      console.log(err);
      return;
    }

    res.status(201).json({ message: "success" });
  });
});

//Update Volunteer Post
router.put("/volunteer/:postId", auth, async (req, res) => {
  try {
    const { name, email, about } = req.body;

    const post = {
      name,
      email,
      about,
    };
    const updatedPost = await Volunteer.findByIdAndUpdate(
      req.post.postId,
      sanitizedObj(post),
      { new: true } // returns the new document
    );
    res.status(200).json({ user: updatedPost });
  } catch (error) {
    return res.status(500).json({ error });
  }
});

// Delete Volunteer Post
router.delete("/volunteer/:postId", auth, async (req, res) => {
  try {
    await Volunteer.findByIdAndDelete(req.params.postId);

    res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error });
  }
});

module.exports = router;
