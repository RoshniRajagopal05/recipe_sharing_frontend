import { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import { getRecipes } from "../services/api";
import "../styles/recipes.css";

function Recipes() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await getRecipes();
      setRecipes(response.data);
      console.log("Fetched recipes:", response.data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const handleDelete = (id) => {
    setRecipes((prev) => prev.filter((recipe) => recipe.id !== id));
  };

  return (
    <div className="container mt-5">
      <h2 className="text-white mb-4">All Recipes</h2>
      <div className="recipes-grid">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}

export default Recipes;