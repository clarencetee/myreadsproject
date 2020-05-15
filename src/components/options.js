import React, { Component } from "react";

class Option extends Component {
  render() {
    return (
      <React.Fragment>
        <option value="move" disabled>
          Move to...
        </option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </React.Fragment>
    );
  }
}

export default Option;
