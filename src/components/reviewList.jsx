import React, { Component } from "react";
import { getReview } from "../services/reviewService";

class ReviewList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: ""
    };
  }

  async componentDidMount() {
    const { bookId } = this.props;
    const { data: reviews } = await getReview(bookId);
    this.setState({ reviews });
    console.log(this.state.reviews)
  }

  render() {
    const { reviews } = this.state;
    return (
      <div>
        {reviews &&
          reviews.map((review) => {
            return (
              <div key={review._id} className="review">
                <div className="review_user">
                  <span>
                    {" "}
                    <i className="bi bi-person-circle"></i>Reviewed by {review.user_id.name}
                  </span>
                </div>
                <p style={{ marginLeft: 10 }}>{review.review_text}</p>
              </div>
            );
          })}
        {reviews.length === 0 && <p>No reviews</p>}
      </div>
    );
  }
}

export default ReviewList;
