import React, { Component } from "react";
import Login from "./MainComps/Login";
import Register from "./MainComps/Register";
import AdminPage from "./MainComps/AdminPage";
import HomePage from "./MainComps/HomePage";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

export default class Main extends Component {
  state = { isLogged: false };

  handleClientFirstImpact = () => {
    if (this.state.isLogged === false) {
      return (
        <Switch>
          <Route exact path="/registration" component={Register} />
          <Route exact path="/" component={HomePage} />
          <Route path="/login" component={Login} />
          <Route path="/adminpage" component={AdminPage} />
        </Switch>
      );
    }
  };
  render() {
    return <div className="Main">{this.handleClientFirstImpact()}</div>;
  }
}
