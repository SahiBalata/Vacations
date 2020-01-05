import React, { Component } from "react";
import { BrowserRouter as Router, Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setIsLoggedIn } from "../../redux/action";
import { setAdminLoggedIn } from "../../redux/setAdminLoggedIn";
import LoginForm from "./LoginComps/LoginForm";

class Login extends Component {
  state = {
    redirect: false
  };

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
  };

  setRedirect = () => {
    this.setState({
      redirect: true
    });
  };

  handleSubmit(e) {
    e.preventDefault();
    var userName = document.querySelector("#userLogin").value;
    var password = document.querySelector("#userPass").value;
    const { setIsLoggedIn } = this.props;

    let RegDetails = {
      userName,
      password
    };
    let regJSONED = JSON.stringify(RegDetails);

    fetch("http://localhost:4000/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: regJSONED
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("HTTP error " + response.status);
        } else if (response.status === 200) {
          return response.text();
        } else if (response.status === 401) {
          return response.text();
        }
      })
      .then(data => {
        console.log(data);
        let dataJson = JSON.parse(data);
        sessionStorage.setItem("user-auth", dataJson.accessToken);
        // setIsLoggedIn(true);
        if (dataJson.decoded.admin) {
          console.log("Decoded is admin");
          // setAdminLoggedIn(true);
          setIsLoggedIn(true, true, dataJson.decoded.name);
        } else {
          setIsLoggedIn(true, false, dataJson.decoded.name);
        }

        this.setRedirect();
      })

      .catch(error => {
        throw error;
      });
  }
  SayShlomi() {
    console.log("Shlomi");
  }

  render() {
    return (
      <>
        {this.renderRedirect()}

        <LoginForm submit={this.handleSubmit} />
      </>
    );
  }
}

export default connect(null, { setIsLoggedIn, setAdminLoggedIn })(Login);
