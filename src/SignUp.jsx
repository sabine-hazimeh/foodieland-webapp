import React, { useState } from "react";
import axios from "axios";
import "./SignUp.css";
import { Link } from "react-router-dom";
function SignUp() {
  const initialFormData = {
    username: "",
    email: "",
    password: "",
  };

  const [user, setUser] = useState(initialFormData);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("username", user.username);
    formData.append("password", user.password);
    formData.append("email", user.email);

    try {
      const response = await axios.post(
        "http://localhost/foodieland/php_backend/users/create.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.status === "success") {
        setUser(initialFormData);
        alert("Signed Up Successfully");
      } else {
        alert("Failed to Sign Up ");
      }
    } catch (error) {
      console.error("There was an error creating the user!", error);
    }
  };

  return (
    <div>
      <h2 className="form-title">Sign Up</h2>
      <form onSubmit={handleSubmit} className="form">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={user.email}
          onChange={handleChange}
        />

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
          Sign Up
        </button>
        <small>
          Already have an acount?
          <Link to="/login">
            <b>Login</b>
          </Link>
        </small>
      </form>
    </div>
  );
}

export default SignUp;
