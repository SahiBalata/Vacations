import React from "react";
import AdminLink from "./AdminLink";
import LogoutButton from "./LogoutButton";
import { Link } from "react-router-dom";
import { setIsLoggedIn } from "../../redux/action";
import { connect } from "react-redux";

function AdminHeader(props) {
  return (
    <>
      <Link to="/adminpage">
        {" "}
        <AdminLink />
      </Link>

      <h5 className="UserHeader">Hello {props.name}</h5>
    </>
  );
}

export default connect(
  state => ({
    isLoggedIn: state.isLoggedIn,
    isAdmin: state.isAdmin,
    userName: state.userName
  }),
  { setIsLoggedIn }
)(AdminHeader);
