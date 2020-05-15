import { Link } from "react-router-dom";
import React, { Component } from "react";
import * as BooksAPI from "../BooksAPI";
import Option from "./options";

class Searchpage extends Component {
  state = {
    query: "",
    books: [],
    showErrorMessage: false,
  };

  updateQuery = (query) => {
    this.setState({
      query: query,
    });
  };

  clearQuery = () => {
    this.updateQuery("");
    this.setState({
      books: [],
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const query = this.state.query;
    const shelfBooks = this.props.books;
    const ids = this.props.shelfCheck(shelfBooks);
    BooksAPI.search(query).then((query) => {
      try {
        query.forEach((book) => {
          if (ids.includes(book.id)) {
            const index = ids.indexOf(book.id);
            book["shelf"] = shelfBooks[index].shelf;
          }
        });
        this.setState({
          books: query,
          showErrorMessage: false,
        });
      } catch (TypeError) {
        this.setState({ showErrorMessage: true });
      }
    });
  };

  componentDidUpdate(prevState) {
    if (this.state.books !== prevState.books) {
      this.onChange = (book, event) => {
        const newOption = event.target.value;
        const id = book.id;
        const books = [...this.state.books];
        books.forEach((array) => {
          if (array.id === id) {
            array["shelf"] = newOption;
          }
        });
        this.setState({
          books: books,
        });
        this.props.handleSearch(book, newOption);
        BooksAPI.update(book, newOption);
      };
    }
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search">Close</button>
          </Link>
          <div className="search-books-input-wrapper">
            <form onSubmit={this.handleSubmit}>
              <input
                type="text"
                placeholder="Search by title or author"
                value={this.state.query}
                onChange={(event) => this.updateQuery(event.target.value)}
              />
            </form>
          </div>
          <button className="clear-search" onClick={this.clearQuery}>
            Clear
          </button>
        </div>
        <div className="search-books-results">
          <div className="bookshelf-books">
            <div className="list-books">
              <div className="list-books-content">
                <div className="bookshelf">
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.state.showErrorMessage && (
                        <alert>Please try another search term!</alert>
                      )}

                      {this.state.query !== "" &&
                        this.state.books.map((book) => (
                          <li key={book.id}>
                            <div className="book">
                              <div className="book-top">
                                <div
                                  className="book-cover"
                                  style={{
                                    width: 128,
                                    height: 193,
                                    backgroundImage:
                                      "url(" + book.imageLinks.thumbnail + ")",
                                  }}
                                ></div>
                                <div className="book-shelf-changer">
                                  <select
                                    key={book.id}
                                    id={book.id}
                                    value={book.shelf ? book.shelf : "none"}
                                    selected={book.shelf ? book.shelf : "none"}
                                    onChange={(event) =>
                                      this.onChange(book, event)
                                    }
                                  >
                                    <Option />
                                  </select>
                                </div>
                              </div>
                              <div className="book-title">{book.title}</div>
                              <div className="book-authors">{book.authors}</div>
                            </div>
                          </li>
                        ))}
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Searchpage;
