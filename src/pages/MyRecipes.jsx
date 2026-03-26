import { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import { getMyRecipes } from "../services/api";
import "../styles/recipes.css";

function MyRecipes() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await getMyRecipes();
      setRecipes(response.data);
    } catch (error) {
      console.error("Error fetching my recipes:", error);
    }
  };

  const handleDelete = (id) => {
    setRecipes((prev) => prev.filter((recipe) => recipe.id !== id));
  };

  return (
    <div className="container mt-5">
      <h2 className="text-white mb-4">My Recipes</h2>
      <div className="recipes-grid">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} onDelete={handleDelete} showEditDelete={true} />
          ))
        ) : (
          <div className="alert alert-info">
            No recipes found. Create one to see it here.
          </div>
        )}
      </div>
    </div>
  );
}

export default MyRecipes;
