import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div>
      <nav className="navbar fixed-top navbar-light bg-transparent">
        <div className="navbar-nav d-flex align-bottom flex-row p-3">
          <Link
            to="/"
            className="nav-item nav-link active navbar-brand"
            href="#"
          >
            Home
          </Link>
          <Link
            to="/operations"
            className="nav-item nav-link navbar-brand"
            href="#"
          >
            Transactions
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
