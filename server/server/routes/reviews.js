const express = require("express");
const auth = require("../middleware/auth");

const { Review, validate } = require("../models/review");

const router = express.Router();

router.get("/", async (req, res) => {
  const reviews = await Review.find();
  res.sent(reviews);
});

router.get("/:id", async (req, res) => {
  try {
    const review = await Review.find({book_id:req.params.id }).populate("user_id", "name -_id");
    res.send(review);
  } catch (error) {
    res.sendStatus(400);
  }
});

router.post("/", auth, async (req, res) => {
  req.body.user_id = req.user._id
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  
  const review = new Review(req.body);
  await review.save();
  res.send(review);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    const review = await Review.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.send(review);
  } catch (error) {
    res.sendStatus(400);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(400);
  }
});

module.exports = router;

//  need to handle when _id does not exists
