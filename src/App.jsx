import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import Recipes from "./Recipes";
import AboutUs from "./AboutUs";
import Footer from "./Footer";
import CreateRecipe from "./CreateRecipe";
import RecipeDetails from "./RecipeDetails";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/create-recipe" element={<CreateRecipe />} />
        <Route path="/details/:id" element={<RecipeDetails />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
