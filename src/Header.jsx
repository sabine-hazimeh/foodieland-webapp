import React from "react";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faHeart } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="container">
      <p className="designed-text">FoodieLand</p>
      <div className="navs">
        <Link to="/" className="active">
          Home
        </Link>
        <Link to="/recipes" className="active">
          Recipes
        </Link>
        <Link to="/about-us" className="active">
          About Us
        </Link>
      </div>
      <div className="icons">
        <FontAwesomeIcon icon={faHeart} />
        <FontAwesomeIcon icon={faUser} />
      </div>
    </header>
  );
}

export default Header;
