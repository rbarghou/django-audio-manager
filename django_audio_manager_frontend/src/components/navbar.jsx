import React from "react";

class NavBar extends React.Component {
  render() {
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">
          Django Audio Manager
        </a>
      </nav>
    );
  }
}

export default NavBar;
