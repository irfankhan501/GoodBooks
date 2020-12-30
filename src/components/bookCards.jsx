import React from "react";
import { Link } from "react-router-dom";

const Cards = ({ books }) => {
  return (
    <div className="row">
      {books.map((book) => {
        return (
          <div className="card m-4 col-sm-6" style={{ width: 300 }} key={book._id}>
            <img
              src={book.cover}
              className="card-img-top"
              alt={book.title}
              style={{ height: 200 }}
            />
            <div className="card-body">
              <h5 className="card-title">{book.title}</h5>
              <h5 className="card-title">by {book.authors[0]}</h5>

              <p className="card-text">{book.discription.slice(0, 50)}...for more click details</p>
              <Link to={`/books/${book._id}`} className="btn btn-primary">
                Details
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Cards;
