import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Row from "react-bootstrap/Row";

import Navbar from "./components/navbar";

function App() {
  return (
    <React.Fragment>
      <Navbar></Navbar>
      <div className="App container-fluid">
        <Row>
          <img src={logo} className="App-logo" alt="logo" />
          <div className="col text-justify text-primary bg-info p-4 m-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </div>
        </Row>
      </div>
    </React.Fragment>
  );
}

export default App;
