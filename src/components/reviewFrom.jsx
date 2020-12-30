import React, { useState } from "react";
import { saveReview } from "../services/reviewService";

const ReviewFrom = (props) => {
  const [reviewText, setReviewText] = useState("");

  const handleReviewSubmit = async () => {
    const book_id = props.match.params.id;
    const review = {
      review_text: reviewText,
      book_id,
    };
    await saveReview(review);
  };

  const handleChange = (e) => {
    setReviewText(e.target.value);
  };

  return (
    <form>
      <div class="mb-3">
        <textarea
          type="text"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          value={reviewText}
          onChange={handleChange}
        />
      </div>
      <button
        type="button"
        class="btn btn-primary"
        onClick={handleReviewSubmit}
      >
        Submit
      </button>
    </form>
  );
};

export default ReviewFrom;
