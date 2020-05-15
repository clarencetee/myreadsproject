import React from "react";
import "./App.css";
import Currentlyreading from "./components/currently";
import WantToRead from "./components/wantto";
import Read from "./components/read";
import { Route } from "react-router-dom";
import { Link } from "react-router-dom";
import Searchpage from "./components/search";
import * as BooksAPI from "./BooksAPI";

class BooksApp extends React.Component {
  state = {
    books: [],
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({
        books: books,
      });
    });
  }

  handleChange = (book, newOption) => {
    const id = book.id;
    const books = [...this.state.books];
    books.forEach((array) => {
      if (array.id === id) {
        array["shelf"] = newOption;
      }
    });
    this.setState({ books: books });
    BooksAPI.update(book, newOption);
  };

  /* enumerating ids in the home state's books so we can check if 
  search result has books already on our shelf*/
  shelfCheck = (books) => {
    const ids = [];
    books.forEach((book) => {
      ids.push(book.id);
    });
    return ids;
  };

  handleSearch = (book, newOption) => {
    const books = [...this.state.books];
    const ids = this.shelfCheck(books);
    if (ids.includes(book.id)) {
      books.forEach((array) => {
        if (array.id === book.id) {
          array["shelf"] = newOption;
        }
      });
      this.setState({
        books: books,
      });
    } else {
      book["shelf"] = newOption;
      this.setState((prevState) => ({
        books: [...prevState.books, book],
      }));
    }
  };

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <div className="bookshelf">
                    <Currentlyreading
                      handleChange={this.handleChange}
                      books={this.state.books}
                    />
                  </div>

                  <div className="bookshelf">
                    <WantToRead
                      handleChange={this.handleChange}
                      books={this.state.books}
                    />
                  </div>
                  <div className="bookshelf">
                    <Read
                      handleChange={this.handleChange}
                      books={this.state.books}
                    />
                  </div>
                </div>
              </div>
              <div className="open-search">
                <Link to="/search">
                  <button>Search</button>
                </Link>
              </div>
            </div>
          )}
        />
        <Route
          path="/search"
          render={() => (
            <Searchpage
              handleChange={this.handleChange}
              handleSearch={this.handleSearch}
              shelfCheck={this.shelfCheck}
              books={this.state.books}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
