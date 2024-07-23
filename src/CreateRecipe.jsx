import React, { useState, useRef, useContext } from "react";
import UserContext from "./userContext";
import "./CreateRecipe.css";

function CreateRecipe() {
  const { user } = useContext(UserContext);
  const initialFormData = {
    name: "",
    description: "",
    ingredients: "",
    image: null,
  };

  const [formData, setFormData] = useState(initialFormData);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("You must be logged in to create a recipe.");
      return;
    }

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }
    formDataToSend.append("user_id", user.id); // Append user_id

    try {
      const response = await fetch(
        "http://localhost/foodieland/php_backend/recipes/create.php",
        {
          method: "POST",
          body: formDataToSend,
        }
      );
      if (response.ok) {
        const data = await response.json();
        alert(data.message); // Show success message from server
        setFormData(initialFormData);
        fileInputRef.current.value = "";
      } else {
        alert("Failed to submit recipe.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred.");
    }
  };

  return (
    <div>
      <h1 className="form-title">Create Recipe</h1>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="form"
      >
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          maxLength="255"
          required
        />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          cols="50"
        />

        <label htmlFor="ingredients">Ingredients:</label>
        <textarea
          id="ingredients"
          name="ingredients"
          value={formData.ingredients}
          onChange={handleChange}
          rows="4"
          cols="50"
        />

        <label htmlFor="image">Image:</label>
        <input
          type="file"
          id="image"
          name="image"
          onChange={handleChange}
          accept="image/*"
          ref={fileInputRef}
          required
        />

        <button type="submit" className="form-btn">
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateRecipe;
