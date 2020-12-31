const express = require("express");
const { Genre, validate } = require("../models/genre");
const router = express.Router();

router.get("/", async (req, res) => {
  const genres = await Genre.find().select("-__v");
  res.send(genres);
});

router.get("/:id", async (req, res) => {
  try {
    const genre = await Genre.findById(req.params.id);
    res.send(genre);
  } catch (error) {
    res.sendStatus(400);
  }
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = new Genre(req.body);
  await genre.save();
  res.send(genre);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    const genre = await Genre.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.send(genre);
  } catch (error) {
    res.sendStatus(400);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Genre.findByIdAndDelete(req.params.id);
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(400);
  }
});

module.exports = router;



//  need to handle when _id does not exists
