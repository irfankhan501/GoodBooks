import React, { Component } from "react";
import ListGroup from "./listGroup";
import Pagination from "./common/pagination";
import { getGenres } from "../services/genreService";
import { getBooks } from "../services/bookService";
import { paginate } from "../utils/paginate";
import SearchBox from "./searchBox";
import Cards from "./bookCards";

class Books extends Component {
  state = {
    books: [],
    genres: [],
    currentPage: 1,
    pageSize: 6,
    searchQuery: "",
    selectedGenre: null,
  };

  async componentDidMount() {
    const { data } = await getGenres();
    const genres = [{ _id: "", genre: "All Genres" }, ...data];

    const { data: books } = await getBooks();
    this.setState({ genres, books });
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1, searchQuery: "" });
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
        b.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filteredBooks = allBooks.filter(
        (b) => b.genre.toLowerCase() === selectedGenre.genre.toLowerCase()
      );

    const books = paginate(filteredBooks, currentPage, pageSize);

    return { totalCount: filteredBooks.length, data: books };
  };

  render() {
    const { length: count } = this.state.books;
    const { pageSize, currentPage, searchQuery } = this.state;
    // const { user } = this.props;

    // if (count === 0) return <p>No book found.</p>;

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
          <Cards books={books} />
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

export default Books;
