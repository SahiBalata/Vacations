import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import RegisterForm from "./LoginComps/RegisterForm";

export default class Register extends Component {
  state = {
    redirect: false
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/login" />;
    }
  };

  setRedirect = () => {
    this.setState({
      redirect: true
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    var userName = document.querySelector("#RuserName").value;
    var password = document.querySelector("#Rpassword").value;
    var email = document.querySelector("#Remail").value;
    var firstName = document.querySelector("#Rfirstname").value;
    var lastName = document.querySelector("#Rlastname").value;

    let RegDetails = {
      userName,
      password,
      email,
      firstName,
      lastName
    };
    let regJSONED = JSON.stringify(RegDetails);

    fetch("http://localhost:4000/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: regJSONED
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("HTTP error " + response.status);
        }
        console.log(response.status);
        if (response.status === 200) {
          this.setRedirect();
        }

        return response.text();
      })
      .then(data => {
        alert(data);
      })
      .catch(error => {
        throw error;
      });
  };

  render() {
    return (
      <>
        {this.renderRedirect()}
        <RegisterForm submit={this.handleSubmit} />
      </>
    );
  }
}
