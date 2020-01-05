import React from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import Main from "./components/Main";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./redux/reducers";

// const composeEnhancers = composeWithDevTools(options);
const store = createStore(reducer);
const uri = "http://localhost/test";
const options = { transports: ["websocket"] };

function App(props) {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header />
          <Main />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
