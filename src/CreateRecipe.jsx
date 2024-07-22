import React, { useState } from "react";
import "./CreateRecipe.css";

function CreateRecipe() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    ingredients: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const response = await fetch(
        "http://localhost/foodieland/php_backend/recipes/create.php",
        {
          method: "POST",
          body: formDataToSend,
        }
      );
      if (response.ok) {
        alert("Recipe submitted successfully!");
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
          required
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CreateRecipe;
