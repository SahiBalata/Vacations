import React from "react";
import LogoutButton from "./LogoutButton";

function UserHeader(props) {
  return (
    <>
      <h5 className="UserHeader">Hello {props.name}</h5>
    </>
  );
}

export default UserHeader;
