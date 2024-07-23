import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserContext from "./userContext";
import "./SignUp.css";

function Login() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const { login } = useContext(UserContext);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost/foodieland/php_backend/users/login.php",
        new URLSearchParams(user),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      if (response.data.status === "success") {
        console.log("Login successful");

        // Store user data in context
        login(response.data.user);
        console.log(response.data.user);
        // Redirect to homepage
        navigate("/");
      } else {
        console.error(response.data.error);
      }
    } catch (error) {
      console.error("There was an error logging in!", error);
    }
  };

  return (
    <div>
      <h2 className="form-title">Login</h2>
      <form onSubmit={handleSubmit} className="form">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          required
          value={user.username}
          onChange={handleChange}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          value={user.password}
          onChange={handleChange}
        />

        <button type="submit" className="form-btn">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
