import React, { Component } from "react";

function DeleteVacation(props) {
  return (
    <button
      className="AddVacation"
      onClick={props.click}
      value="DeleteVacation"
    >
      Delete vacation
    </button>
  );
}

export default DeleteVacation;
