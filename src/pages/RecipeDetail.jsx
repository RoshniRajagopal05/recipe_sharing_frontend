import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getRecipe, deleteRecipe } from "../services/api";
import "../styles/recipeDetail.css";

function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await getRecipe(id);
        setRecipe(response.data.recipe || response.data);
      } catch (err) {
        console.error(err);
        setError(
          err.response?.data?.message || err.response?.data?.error || "Failed to load recipe"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  const currentUser = localStorage.getItem("userEmail") || "";
  const isOwner =
    currentUser &&
    recipe?.user?.email &&
    recipe.user.email.toLowerCase() === currentUser.toLowerCase();

  const handleDelete = async () => {
    if (!window.confirm("Delete this recipe? This cannot be undone.")) return;

    try {
      await deleteRecipe(id);
      navigate("/recipes");
    } catch (err) {
      console.error(err);
      alert("Failed to delete recipe. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="alert alert-info">Loading recipe...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">{error}</div>
        <Link to="/recipes" className="btn btn-outline-secondary">
          Back to recipes
        </Link>
      </div>
    );
  }

  

  return (
    <div className="container mt-5">
      <div className="recipe-detail">
        <div className="recipe-detail__header">
          <h2 className="recipe-detail__title">{recipe.title}</h2>
          <div className="recipe-detail__actions">
            <Link to="/recipes" className="btn btn-outline-light">
              Back
            </Link>
          </div>
        </div>

        <div className="recipe-detail__grid">
          <img
            src={recipe.image_upload}
            className="recipe-detail__image"
            alt={recipe.title}
          />

          <div className="recipe-detail__card">
            <div className="recipe-detail__content">
              <div className="recipe-detail__section">
                <strong>Ingredients</strong>
                <p>{recipe.ingredients}</p>
              </div>

              <div className="recipe-detail__section">
                <strong>Steps</strong>
                <p>{recipe.Steps}</p>
              </div>

              <div className="recipe-detail__meta">
                <p>
                  <strong>Cooking time:</strong> {recipe.cooking_time}
                </p>
                <p>
                  <strong>Difficulty:</strong> {recipe.diffifulty_level}
                </p>
              </div>

              <p className="text-muted" style={{ marginTop: 20 }}>
                Uploaded by: {recipe.user?.email || "Unknown"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetail;
