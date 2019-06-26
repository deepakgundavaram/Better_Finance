import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../styles/Navbar.css"

class Navbar extends Component {

  //logout the user, remove the token from the session storage
  logout = () => {
    sessionStorage.clear("key");
  }

  //clicking the logo, if user logged in then it goes to the dashboard
  logo = (e) => {
    if(sessionStorage.getItem("key") != null){
      e.preventDefault();
    }
  }

  render() {


    return (
      <div className="container">

        <div>
          <Link to="/" onClick={this.logo}
            className="header-logo header-text"
          >
            BetterFinance
          </Link>
        </div>

        <Link to="/" onClick={this.logout}
          className="header-text"
        >
          logout
        </Link>
        <Link to="/debt"
          className="header-text"
        >
          Debt
        </Link>
        <Link to="/spendings" 
          className="header-text"
        >
          Spendings
        </Link>
        <Link to="/dashboard"
          className="header-text"
        >
          Dashboard
        </Link>
      
      </div>
    );
  }
}
export default Navbar;