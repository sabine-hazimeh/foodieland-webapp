import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import "./Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faFaceSmile } from "@fortawesome/free-regular-svg-icons";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import meatplate from "./assets/meatplate.png";

function Home() {
  const imageRef = useRef(null);
  const titleRef = useRef(null);
  const paragraphRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      imageRef.current,
      { opacity: 0, x: -100 },
      { opacity: 1, x: 0, duration: 1.5 }
    )
      .fromTo(
        titleRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 1.5 },
        "-=0.5"
      )
      .fromTo(
        paragraphRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 1.5 },
        "-=0.5"
      )
      .fromTo(
        buttonRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.5 },
        "-=0.5"
      );
  }, []);

  return (
    <div className="body">
      <div className="App">
        <div className="left">
          <h1 ref={titleRef}>ENJOY THE BEST FOOD RECIPES</h1>
          <p ref={paragraphRef}>
            Discover delicious recipes that are easy to make and perfect for any
            occasion. From quick weeknight dinners to gourmet meals, find your
            next favorite recipe!
          </p>
          <Link to="/recipes">
            <button className="home-btn" ref={buttonRef}>
              Explore Recipes
            </button>
          </Link>
        </div>
        <div className="right">
          <img
            src={meatplate}
            alt="Meat Plate"
            ref={imageRef}
            key={Math.random()}
          />
        </div>
      </div>
      <div className="Introduction">
        <p>
          Welcome to FoodieLand, your go-to destination for delightful recipes
          from around the world. Whether you're a seasoned chef or a beginner in
          the kitchen, our curated selection of recipes will inspire you to
          create delicious meals with ease. From hearty breakfasts to elegant
          dinners, our step-by-step guides ensure that your culinary creations
          are both beautiful and tasty. Join our community and start your
          culinary adventure today!
        </p>
      </div>
      <hr className="line"></hr>
      <div className="features">
        <div className="features-title">
          <p>Special Benefits For You</p>
          <h2>Why Should Choose Us</h2>
        </div>
        <div className="features-container">
          <div className="feature-item">
            <FontAwesomeIcon icon={faUtensils} className="feature-icon" />
            <p>
              Access a wide range of recipes from various cuisines and dietary
              preferences.
            </p>
          </div>
          <div className="feature-item">
            <FontAwesomeIcon icon={faFaceSmile} className="feature-icon" />
            <p>
              Read reviews and ratings from other users to find the best
              recipes.
            </p>
          </div>
          <div className="feature-item">
            <FontAwesomeIcon icon={faBookmark} className="feature-icon" />
            <p>
              Save your favorite recipes and share them with friends and family.
            </p>
          </div>
        </div>
      </div>
      <hr className="line"></hr>
    </div>
  );
}

export default Home;
