const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const reviewSchema = new mongoose.Schema({
  book_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  review_text: {
    type: String,
    required: true,
  },
  review_rate: Number,
  likes: Number,
});

const Review = mongoose.model("Review", reviewSchema);

function validateReview(review) {
  const schema = Joi.object({
    book_id: Joi.objectId().required(),
    user_id: Joi.objectId().required(),
    review_text: Joi.string().min(3).max(1024).required(),
    review_rate: Joi.number().min(0).max(5),
  });

  return schema.validate(review);
}

exports.Review = Review;
exports.validate = validateReview;
