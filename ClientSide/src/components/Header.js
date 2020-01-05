import React, { Component } from "react";
import Logo from "./HeaderComps/Logo";
import UserHeader from "./HeaderComps/UserHeader";
import LoginLink from "./HeaderComps/LoginLink";
import AdminHeader from "./HeaderComps/AdminHeader";
import RegisterLink from "./HeaderComps/RegisterLink";
import { BrowserRouter as Router, Link, Redirect } from "react-router-dom";
import LogoutButton from "./HeaderComps/LogoutButton";
import { setIsLoggedIn } from "../redux/action";
import { connect } from "react-redux";

class Header extends Component {
  state = {
    isLoggedIn: this.props.isLoggedIn,
    userName: this.props.userName,
    admin: this.props.isAdmin
  };

  // setStateUserName = (user, admin) => {
  //   this.setState({
  //     userName: user,
  //     admin: admin
  //   });
  //   console.log(this.state);
  // };

  handleLoginRedirect = () => {
    return <Redirect to="/login" />;
  };
  handleRedirectAfterLogin = () => {
    return <Redirect to="/" />;
  };
  handleLogOut = () => {
    sessionStorage.removeItem("user-auth");
    const { setIsLoggedIn } = this.props;
    setIsLoggedIn(false, false, "");
    console.log(this.props);
  };

  renderUserHeader() {
    if (!this.props.isLoggedIn) {
      return (
        <>
          <Link to="/login">
            <LoginLink />
          </Link>

          <Link to="/registration">
            <RegisterLink />
          </Link>
        </>
      );
    } else if (this.props.isAdmin && this.props.isLoggedIn) {
      return (
        <>
          {" "}
          <LogoutButton click={this.handleLogOut} />
          <AdminHeader name={this.props.userName} />{" "}
        </>
      );
    } else if (this.props.isLoggedIn) {
      return (
        <>
          {" "}
          <LogoutButton click={this.handleLogOut} />{" "}
          <UserHeader name={this.props.userName} /> <Redirect to="/" />{" "}
        </>
      );
    } else {
      return (
        <Link to="/login">
          <LoginLink />
        </Link>
      );
      // return <div>Logged In</div>;
    }
    //    if(!this.state.admin){
    //      return <UserHeader name ={this.state.userName}/>
    //    }
    //    else if(this.state.admin){
    //      return  <AdminHeader name ={this.state.userName}/>
    //    }
  }

  componentDidMount() {
    if (sessionStorage.getItem("user-auth")) {
      var tokenToSend = { token: sessionStorage.getItem("user-auth") };
      var regJSONED = JSON.stringify(tokenToSend);
      const { setIsLoggedIn } = this.props;
      fetch("http://localhost:4000/users/token", {
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
          return response.text();
        })
        .then(data => {
          let JsonedUserName = JSON.parse(data);
          console.log(this.props);
          setIsLoggedIn(true, JsonedUserName.admin, JsonedUserName.name);
          console.log(this.props);
        });
    }
  }

  render() {
    return (
      <header>
        <Logo />

        {this.renderUserHeader()}
      </header>
    );
  }
}

export default connect(
  state => ({
    isLoggedIn: state.isLoggedIn,
    isAdmin: state.isAdmin,
    userName: state.userName
  }),
  { setIsLoggedIn }
)(Header);
