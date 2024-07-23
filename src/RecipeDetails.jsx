import React, { useState, useEffect } from "react";
import "./RecipeDetails.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaRegComments } from "react-icons/fa";
import { jsPDF } from "jspdf";

function RecipeDetails() {
  const [recipe, setRecipe] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [rating, setRating] = useState("");
  const [comments, setComments] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(
          `http://localhost/foodieland/php_backend/recipes/readOne.php?id=${id}`
        );
        setRecipe(response.data.Recipes[0]);
      } catch (error) {
        console.error("Error fetching recipe details:", error);
      }
    };

    fetchRecipe();
  }, [id]);

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `http://localhost/foodieland/php_backend/comments/readAll.php?id=${id}`
      );
      setComments(response.data.comments || []);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [id]);

  const addComment = async () => {
    if (!commentText || !rating) {
      alert("Please enter both a comment and a rating.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost/foodieland/php_backend/comments/create.php`,
        {
          comment_text: commentText,
          rating: rating,
          recipe_id: id,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      alert(response.data.message || response.data.error);
      setCommentText("");
      setRating("");
      fetchComments();
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const copyToClipboard = () => {
    const url = window.location.href;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        alert("Link copied to clipboard!");
      })
      .catch((error) => {
        console.error("Failed to copy link:", error);
      });
  };

  const downloadAsPDF = () => {
    const doc = new jsPDF();
    doc.text(`Recipe: ${recipe.name}`, 10, 10);
    doc.text(`Description: ${recipe.description}`, 10, 20);
    doc.text(`Ingredients: ${recipe.ingredients}`, 10, 30);
    doc.save(`${recipe.name}.pdf`);
  };

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
      <div className="action-buttons">
        <button onClick={copyToClipboard} className="comment-btn">
          Share Recipe
        </button>
        <button onClick={downloadAsPDF} className="comment-btn">
          Download Recipe
        </button>
      </div>
      <div className="comment-container">
        <div className="comment-left">
          <select
            className="comment-dropdown"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          >
            <option value="" disabled>
              Rate the recipe
            </option>
            {[1, 2, 3, 4, 5].map((rate) => (
              <option key={rate} value={rate}>
                {rate}
              </option>
            ))}
          </select>
          <textarea
            className="comment-textarea"
            placeholder="Add your comments here..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          ></textarea>
          <button className="comment-btn" onClick={addComment}>
            Add Comment
          </button>
        </div>
        <div className="comment-right">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.id} className="comment-item">
                <p className="comment_text">
                  <strong>Rating:</strong> {comment.rating}
                </p>
                <p className="comment_text">{comment.comment_text}</p>
              </div>
            ))
          ) : (
            <>
              <FaRegComments className="comment-icon" />
              <p>No comments yet</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default RecipeDetails;
