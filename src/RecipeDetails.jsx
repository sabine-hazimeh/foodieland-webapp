import React, { useState, useEffect } from "react";
import "./RecipeDetails.css";
import axios from "axios";
import { useParams } from "react-router-dom";

function RecipeDetails() {
  const [recipe, setRecipe] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const DisplayRecipe = async () => {
      try {
        const response = await axios.get(
          `http://localhost/foodieland/php_backend/recipes/readOne.php?id=${id}`
        );

        setRecipe(response.data.Recipes[0]);
        console.log(response.data.Recipes[0]);
      } catch (error) {
        console.error("Error fetching recipe details:", error);
      }
    };

    DisplayRecipe();
  }, [id]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div className="details-container">
      <h1 className="recipe-title">{recipe.name}</h1>
      <div className="recipe-container">
        <img
          src={`data:image/jpeg;base64,${recipe.image}`}
          alt={recipe.name}
          className="image-details"
        />
        <div className="information-container">
          <p>{recipe.description}</p>
          <p>{recipe.ingredients}</p>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetails;
