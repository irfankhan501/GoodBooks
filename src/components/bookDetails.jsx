import React, { Component } from "react";
import { getBook } from "../services/bookService";
import auth from "../services/authService";
import {
  getBooks,
  saveBook,
  newBook,
  getBooksId,
} from "../services/myBooksService";

import ProtectedRoute from "./common/protectedRoute";

import ReviewFrom from "./reviewFrom";
import ReviewList from "./reviewList";

class BookDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewToggle: false,
      addShelf: "add to shelf",
      user: "",
    };
  }

  async componentDidMount() {
    const bookId = this.props.match.params.id;
    const { data: book } = await getBook(bookId);

    const user = auth.getCurrentUser();
    this.setState({ user, book });
    this.getShelfOfBookForCurrentUser();
  }

  handleReview = () => {
    this.setState({ reviewToggle: !this.state.reviewToggle });
  };

  handleDropDown = async (text) => {
    if (this.state.user) {
      this.setState({ addShelf: text });
      const { data: books } = await getBooks();
      const body = { book_id: this.state.book._id, shelf: text };
      books != "" ? await saveBook(body) : await newBook(body);
    } else {
      this.props.history.push("/signin");
    }
  };

  getShelfOfBookForCurrentUser = async () => {
    if (this.state.user) {
      const { data: myBooks } = await getBooksId();
      const book = myBooks[0].books.find(
        (obj) => obj.book_id == this.state.book._id
      );
      if (book !== undefined) {
        return this.setState({ addShelf: book.shelf });
      }
    }
  };

  render() {
    const { book, reviewToggle } = this.state;
    return (
      <>
        {book && (
          <div className="d-flex justify-content-center mt-4">
            <div>
              <img src={book.cover} alt={book.title} style={{ width: 200 }} />
            </div>

            <div style={{ width: 500 }} className="ms-5">
              <h5>{book.title}</h5>
              <h5>by {book.authors}</h5>

              <p>{book.discription}</p>
              <button
                className="btn btn-primary my-3"
                type="button"
                onClick={this.handleReview}
              >
                Write a review
              </button>
              <div className="btn-group m-4">
                <button
                  type="button"
                  className="btn btn-primary dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {this.state.addShelf}
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => this.handleDropDown("read")}
                    >
                      read
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => this.handleDropDown("want to read")}
                    >
                      want to read
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => this.handleDropDown("currentlly reading")}
                    >
                      currentlly reading
                    </button>
                  </li>
                </ul>
              </div>
              {reviewToggle && (
                <ProtectedRoute
                  path={`/book/${book._id}`}
                  component={ReviewFrom}
                />
              )}
              <h4 className="mt-2">Reviews</h4>
              <hr />
              <ReviewList bookId={book._id} />
            </div>
          </div>
        )}
      </>
    );
  }
}

export default BookDetails;
