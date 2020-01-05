import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { setIsLoggedIn as setIsLoggedInAction } from "../../redux/action";
import { connect } from "react-redux";

function LogoutButton(props) {
  return (
    <button
      type="button"
      className="btn btn-warning"
      id="LogoutButton"
      onClick={props.click}
    >
      Log out
    </button>
  );
}

export default connect(
  state => ({
    isLoggedIn: state.isLoggedIn,
    isAdmin: state.isAdmin,
    userName: state.userName
  }),
  { setIsLoggedIn: setIsLoggedInAction }
)(LogoutButton);
