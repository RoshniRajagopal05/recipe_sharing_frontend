import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRecipe, updateRecipe } from "../services/api";
import "../styles/recipeDetail.css";

function EditRecipe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    ingredients: "",
    steps: "",
    cooking_time: "",
    difficulty_level: "Easy",
    image_upload: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await getRecipe(id);
        const recipe = response.data.recipe || response.data;
        const currentUser = localStorage.getItem("userEmail") || "";
        if (
          !currentUser ||
          !recipe.user?.email ||
          recipe.user.email.toLowerCase() !== currentUser.toLowerCase()
        ) {
          setError("You are not allowed to edit this recipe.");
          setLoading(false);
          return;
        }

        setFormData({
          title: recipe.title || "",
          ingredients: recipe.ingredients || "",
          steps: recipe.Steps || "",
          cooking_time: recipe.cooking_time || "",
          difficulty_level: recipe.diffifulty_level || "Easy",
          image_upload: null,
        });
      } catch (err) {
        console.error(err);
        setError("Could not load recipe for editing.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image_upload") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const data = new FormData();
    data.append("recipe_id", id);
    data.append("title", formData.title);
    data.append("ingredients", formData.ingredients);
    data.append("steps", formData.steps);
    data.append("cooking_time", formData.cooking_time);
    data.append("difficulty_level", formData.difficulty_level);
    if (formData.image_upload) {
      data.append("image_upload", formData.image_upload);
    }

    try {
      await updateRecipe(data);
      navigate(`/recipes/${id}`);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || err.response?.data?.error || "Failed to save changes"
      );
    }
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="alert alert-info">Loading recipe details...</div>
      </div>
    );
  }

  return (
    <div className="recipe-detail">
      <div className="recipe-detail__header">
        <h2 className="recipe-detail__title">Edit Recipe</h2>
      </div>
      <div className="recipe-detail__card">
        <div className="recipe-detail__content">
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                className="form-control"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Ingredients</label>
              <textarea
                className="form-control"
                name="ingredients"
                rows="4"
                value={formData.ingredients}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Steps</label>
              <textarea
                className="form-control"
                name="steps"
                rows="6"
                value={formData.steps}
                onChange={handleChange}
                required
              />
            </div>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Cooking Time</label>
                <input
                  className="form-control"
                  name="cooking_time"
                  value={formData.cooking_time}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Difficulty</label>
                <select
                  className="form-select"
                  name="difficulty_level"
                  value={formData.difficulty_level}
                  onChange={handleChange}
                  required
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
            </div>

            <div className="mb-3 mt-3">
              <label className="form-label">Update Image</label>
              <input
                type="file"
                className="form-control"
                name="image_upload"
                accept="image/*"
                onChange={handleChange}
              />
              <small className="text-muted">
                Leave blank to keep existing image.
              </small>
            </div>

            <div className="d-flex gap-2">
              <button className="btn btn-warning" type="submit">
                Save changes
              </button>
              <button
                className="btn btn-outline-light"
                type="button"
                onClick={() => navigate(`/recipes/${id}`)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditRecipe;
