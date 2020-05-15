import React, { Component } from "react";
import Option from "./options";

class Booklist extends Component {
  render() {
    const { handleChange, book, books } = this.props;
    return (
      <React.Fragment>
        {books.map((book) => (
          <li key={book.id}>
            <div className="book">
              <div className="book-top">
                <div
                  className="book-cover"
                  style={{
                    width: 128,
                    height: 193,
                    backgroundImage: "url(" + book.imageURL + ")",
                  }}
                ></div>
                <div className="book-shelf-changer">
                  <select
                    id={book.id}
                    value={book.value}
                    onChange={handleChange}
                  >
                    <Option />
                  </select>
                </div>
              </div>
              <div className="book-title">{book.title}</div>
              <div className="book-authors">{book.author}</div>
            </div>
          </li>
        ))}
      </React.Fragment>
    );
  }
}

export default Booklist;

/*

<li>
          <div className="book">
            <div className="book-top">
              <div
                className="book-cover"
                style={{
                  width: 128,
                  height: 193,
                  backgroundImage: "url(" + this.state.books[1].imageURL + ")",
                }}
              ></div>
              <div className="book-shelf-changer">
                <select id={this.state.books.id} onChange={this.handleChange}>
                  <Option />
                </select>
              </div>
            </div>
            <div className="book-title">To Kill a Mockingbird</div>
            <div className="book-authors">Harper Lee</div>
          </div>
        </li>
        <li>
          <div className="book">
            <div className="book-top">
              <div
                className="book-cover"
                style={{
                  width: 128,
                  height: 188,
                  backgroundImage:
                    'url("http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api")',
                }}
              ></div>
              <div className="book-shelf-changer">
                <select>
                  <Option />
                </select>
              </div>
            </div>
            <div className="book-title">Ender's Game</div>
            <div className="book-authors">Orson Scott Card</div>
          </div>
        </li>
*/
