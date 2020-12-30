import React, { Component } from "react";
import { Link } from "react-router-dom";
import ListGroup from "./listGroup";
import Pagination from "./common/pagination";
import { getBooks } from "../services/myBooksService";
import { paginate } from "../utils/paginate";
import SearchBox from "./searchBox";

class MyBooks extends Component {
  state = {
    books: [],
    genres: [
      { _id: "", genre: "All" },
      { _id: "1", genre: "Read" },
      { _id: "2", genre: "Currentlly reading" },
      { _id: "3", genre: "Want to read" },
    ],
    currentPage: 1,
    pageSize: 6,
    searchQuery: "",
    selectedGenre: null,
  };

  async componentDidMount() {
    const { data: books } = await getBooks();
    if (books != "") {
       this.setState({ books: books[0].books });
    }
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      selectedGenre,
      searchQuery,
      books: allBooks,
    } = this.state;

    let filteredBooks = allBooks;
    if (searchQuery)
      filteredBooks = allBooks.filter((b) =>
        b.book_id.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filteredBooks = allBooks.filter(
        (b) => b.shelf.toLowerCase() === selectedGenre.genre.toLowerCase()
      );

    const books = paginate(filteredBooks, currentPage, pageSize);

    return { totalCount: filteredBooks.length, data: books };
  };

  render() {
    const { pageSize, currentPage, searchQuery } = this.state;
    const { totalCount, data: books } = this.getPagedData();

    return (
      <div className="row">
        <div className="col-2 p-3">
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <p>Showing {totalCount} boooks.</p>

          {/* start */}
          <div className="row">
            {books && books.map((b) => {
              const { book_id: book } = b;
              return (
                <div
                  className="card m-4 col-sm-6"
                  style={{ width: 300 }}
                  key={book._id}
                >
                  <img
                    src={book.cover}
                    className="card-img-top"
                    alt={book.title}
                    style={{ height: 200 }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{book.title}</h5>
                    <h5 className="card-title">by {book.authors[0]}</h5>

                    <p className="card-text">
                      {book.discription.slice(0, 50)}...for more click details
                    </p>
                    <Link to={`/books/${book._id}`} className="btn btn-primary">
                      Details
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
          {/* end */}
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default MyBooks;
