const express = require("express");
const _ = require("lodash");
const auth = require("../middleware/auth");
const { MyBook, validate } = require("../models/myBook");
const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    const myBooks = await MyBook.find({ user_id: req.user._id })
      .select("books -_id")
      .populate("books.book_id");
    res.send(myBooks);
  } catch (error) {
    res.sendStatus(400);
  }
});

router.get("/id", auth, async (req, res) => {
  try {
    const myBooks = await MyBook.find({ user_id: req.user._id }).select(
      "books -_id"
    );
    res.send(myBooks);
  } catch (error) {
    res.sendStatus(400);
  }
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const myBook = new MyBook({
    user_id: req.user._id,
    books: req.body,
  });
  await myBook.save();
  res.send(myBook);
});

router.put("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const { book_id, shelf } = req.body;
    let myBooks = await MyBook.findOne({ user_id: req.user._id });
    const book = myBooks.books.find((obj) => obj.book_id == book_id);

    if (book === undefined) {
      myBooks.books.push(req.body);
    } else {
      const index = myBooks.books.indexOf(book);
      myBooks.books[index].shelf = shelf;
    }
    
    const savedBook = await myBooks.save();
    res.send(savedBook);
  } catch (error) {
    res.sendStatus(400);
  }
});

// router.delete("/:id", async (req, res) => {
//   try {
//     await Book.findByIdAndDelete(req.params.id);
//     res.sendStatus(200);
//   } catch (error) {
//     res.sendStatus(400);
//   }
// });

module.exports = router;
