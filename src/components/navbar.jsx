import React from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = ({ user }) => {
  return (
    <nav className="navbar sticky-top navbar-expand navbar-dark bg-primary">
      <div class="container-fluid">
        <Link className="navbar-brand mb-0 h1" to="/">
          GoodBooks
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav d-flex">
            <NavLink className="nav-item nav-link fs-5" to="/">
              Home
            </NavLink>
            <NavLink
              className="nav-item nav-link fs-5 "
              to="/mybooks"
            >
              MyBooks
            </NavLink>
            {!user && (
              <>
                <NavLink className="nav-item nav-link fs-5" to="/signin">
                  Sign in
                </NavLink>
                <NavLink className="nav-item nav-link fs-5" to="/signup">
                  Sign up
                </NavLink>
              </>
            )}
            {user && (
              <>
                {/* <NavLink className="nav-item nav-link fs-5" to="/profile">
                  {user.name}
                </NavLink> */}
                <NavLink className="nav-item nav-link fs-5" to="/logout">
                  Logout
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
