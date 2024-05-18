import React from "react";
import "./Navbar.css";

function Navbar() {
  return (
    <div className="navbar-container">
      <div className="navbar-Innercontainer">
        <div className="navbar-toggleIcon">
          <img
            src={require("../../assets/sibebar-icon.png")}
            alt="toggle-button"
          />
        </div>
        <div className="navbar-title">Students</div>
      </div>
    </div>
  );
}

export default Navbar;
