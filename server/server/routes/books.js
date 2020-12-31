const express = require("express");
const { Book, validate } = require("../models/book");
const router = express.Router();

router.get("/", async (req, res) => {
  const books = await Book.find()
    .select("-__v")
    .sort("createdAt");
  res.send(books);
});

router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    res.send(book);
  } catch (error) {
    res.sendStatus(400);
  }
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const book = new Book(req.body);
  await book.save();
  res.send(book);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const book = await Book.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.send(book);
  } catch (error) {
    res.sendStatus(400);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(400);
  }
});

module.exports = router;
