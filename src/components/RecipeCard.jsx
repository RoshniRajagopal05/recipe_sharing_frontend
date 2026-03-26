import { Link } from "react-router-dom";
import { deleteRecipe } from "../services/api";

function RecipeCard({ recipe, onDelete, showEditDelete = false }) {
  const summary = recipe.ingredients || recipe.Steps || "No description available.";
  const imageUrl = recipe.image_upload
    ? `http://127.0.0.1:8000/${recipe.image_upload.toString().replace(/^\//, "")}`
    : "https://via.placeholder.com/400x250?text=No+Image";

  const currentUser = localStorage.getItem("userEmail") || "";
  const isOwner =
    currentUser &&
    recipe.user?.email &&
    recipe.user.email.toLowerCase() === currentUser.toLowerCase();

  const handleDelete = async (e) => {
    e.preventDefault();
    if (!onDelete) return;
    if (!window.confirm("Delete this recipe? This cannot be undone.")) return;

    try {
      await deleteRecipe(recipe.id);
      onDelete(recipe.id);
    } catch (error) {
      console.error("Delete failed", error);
      alert("Failed to delete recipe. Please try again.");
    }
  };

  return (
    <div className="recipe-card">
      <img src={imageUrl} alt={recipe.title} className="recipe-card__image" />

      <div className="recipe-card__body">
        <h3 className="recipe-card__title">{recipe.title}</h3>
        <p className="recipe-card__creator">
          By {recipe.user?.name || recipe.user?.email || "Unknown"}
        </p>
        <p className="recipe-card__summary">{summary}</p>
        <div className="recipe-card__footer">
          <Link to={`/recipes/${recipe.id}`} className="btn btn-warning recipe-card__btn">
            View
          </Link>
          {showEditDelete && isOwner && (
            <>
              <Link
                to={`/recipes/${recipe.id}/edit`}
                className="btn btn-outline-light recipe-card__btn"
              >
                Edit
              </Link>
              <button
                type="button"
                className="btn btn-outline-danger recipe-card__btn"
                onClick={handleDelete}
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;