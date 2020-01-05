import React, { Component } from "react";

function EditVacation(props) {
  var style = "margin-left: 3%";

  return (
    <button
      className="AddVacation"
      id="editvac"
      value="EditVacation"
      onClick={props.click}
    >
      Edit Vacation
    </button>
  );
}

export default EditVacation;
