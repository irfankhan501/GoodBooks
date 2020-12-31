const  mongoose = require("mongoose");
const Joi = require("joi");

const commentSchema = new mongoose.Schema({
  review_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Review",
  },
  comments: [
    {
      user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      text: {
        type: String,
        required: true,
      },
    },
  ],
});

const Comment = mongoose.model("Comment", commentSchema);

function validateComment(comment) {
  const schema = Joi.object({
    text: Joi.string().min(3).max(1024).required(),
  });

  return schema.validate(comment);
}

exports.Comment = Comment;
exports.validate = validateComment;
