import React, { Component } from "react";
import Option from "./options";

class Currentlyreading extends Component {
  onChange = (book, event) => {
    const newOption = event.target.value;
    this.props.handleChange(book, newOption);
  };

  render() {
    const { books } = this.props;

    return (
      <React.Fragment>
        <h2 className="bookshelf-title">Currently Reading</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books
              .filter((item) => item.shelf === "currentlyReading")
              .map((book) => (
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
                          value={book.shelf}
                          selected={book.shelf}
                          onChange={(event) => this.onChange(book, event)}
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
      </React.Fragment>
    );
  }
}

export default Currentlyreading;
