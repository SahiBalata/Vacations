import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Logo extends Component {
  render() {
    return (
      <Link to="/">
        {" "}
        <img
          src="https://image.flaticon.com/icons/png/512/619/619043.png"
          alt=""
          id="logo"
        />
      </Link>
    );
  }
}
