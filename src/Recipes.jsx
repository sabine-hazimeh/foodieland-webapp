import React, { useState, useEffect } from "react";
import "./Recipe.css";
import axios from "axios";
import { Link } from "react-router-dom";

function Recipe() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(
          "http://localhost/foodieland/php_backend/recipes/readAll.php"
        );
        if (response.data && response.data.Recipes) {
          setRecipes(response.data.Recipes);
        } else {
          console.error("Invalid response structure:", response.data);
        }
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
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <div key={recipe.recipe_id} className="card">
              <img
                src={`data:image/jpeg;base64,${recipe.image}`}
                alt={recipe.name}
                className="recipe-img"
              />
              <h2>{recipe.name}</h2>
            </div>
          ))
        ) : (
          <p>No recipes available</p>
        )}
      </div>
    </>
  );
}

export default Recipe;
