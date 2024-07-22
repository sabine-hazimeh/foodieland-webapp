import React from "react";
import "./Recipe.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
function Recipe() {
  const [recipes, setList] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(
          "http://localhost/foodieland/php_backend/recipes/readAll.php"
        );
        setList(response.data.Recipes);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <>
      <Link to="/create-recipe">
        <button className="btn">Create New Recipe</button>
      </Link>

      <div className="cards-container">
        {recipes.map((recipe) => (
          <div key={recipe.recipe_id} className="card">
            <img src={recipe.image} alt={recipe.name} />
            <h2>{recipe.name}</h2>
            <p>{recipe.description}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default Recipe;
