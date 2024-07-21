import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import "./Footer.css"; // Ensure you have the CSS file

function Footer() {
  return (
    <>
      <footer className="container">
        <div className="footer-column">
          <h5>Contact Us:</h5>
          <p>
            <FontAwesomeIcon icon={faPhone} /> +961 3 374 791
          </p>
          <p>
            <FontAwesomeIcon icon={faEnvelope} /> foodieland@gmail.com
          </p>
        </div>
        <div className="footer-column">
          <h5>About Us:</h5>
          <p>
            FoodieLand is your go-to place for the best recipes from around the
            world.
          </p>
        </div>
        <div className="footer-column">
          <h5>Follow Us:</h5>
          <p>
            <FontAwesomeIcon icon={faFacebook} /> FoodieLand
          </p>
          <p>
            <FontAwesomeIcon icon={faInstagram} /> Foodie_Land
          </p>
          <p>
            <FontAwesomeIcon icon={faTwitter} /> FoodieLand_lb
          </p>
        </div>
      </footer>
    </>
  );
}

export default Footer;
