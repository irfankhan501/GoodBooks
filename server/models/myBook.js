const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const myBooksSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  books: [{
    book_id: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
    shelf: { type: String, required: true }
  }],
  // read: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
  // want_to_read: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
  // currentlly_reading: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
});

const MyBook = mongoose.model("MyBook", myBooksSchema);

function validateMyBook(myBook) {
  const schema = Joi.object({
    book_id: Joi.objectId().required(),
    shelf: Joi.string().min(4).required(),
  });

  return schema.validate(myBook);
}

exports.MyBook = MyBook;
exports.validate = validateMyBook;
