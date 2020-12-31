const express = require("express");
const { Comment, validate } = require("../models/comment");
const router = express.Router();

router.get("/", async (req, res) => {
  const comments = await Comment.find().select("-__v");
  res.send(comments);
});

router.get("/:id", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    res.send(comment);
  } catch (error) {
    res.sendStatus(400);
  }
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const comment = new Comment(req.body);
  await comment.save();
  res.send(comment);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    const comment = await Comment.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.send(comment);
  } catch (error) {
    res.sendStatus(400);
  }
});

router.delete("/:id", async (req, res) => {
  await Comment.findByIdAndDelete(req.params.id);
  res.sendStatus(200);
});

module.exports = router;
