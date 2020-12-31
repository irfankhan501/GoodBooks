const mongoose = require("mongoose");
const Joi = require("joi");
const { genreSchema } = require("./genre");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
  },
  // isbn: {
  //   type: String,
  //   required: true,
  // },
  authors: [
    {
      type: String,
      required: true,
    },
  ],
  genre: {
    type: String,
    required: true,
  },
  discription: {
    type: String,
    required: true,
  },
  cover: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Book = mongoose.model("Book", bookSchema);

function validateBook(book) {
  const schema = Joi.object({
    title: Joi.string().min(3).max(50).required(),
    subtitle: Joi.string().min(3).max(50),
    // isbn: Joi.string().max(13).required(),
    authors: Joi.string().min(2).max(255).required(),
    genre: Joi.string().required(),
    discription: Joi.string().min(25).max(2048).required().required(),
    cover: Joi.string().required(),
  });

  return schema.validate(book);
}

exports.Book = Book;
exports.validate = validateBook;
