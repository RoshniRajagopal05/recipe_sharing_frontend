import React, { useState } from 'react';
import { createRecipe } from '../services/api';
import { useNavigate } from 'react-router-dom';
import '../styles/createRecipe.css';

function CreateRecipe() {
  const [formData, setFormData] = useState({
    title: '',
    ingredients: '',
    steps: '',
    cooking_time: '',
    difficulty_level: 'Easy',
    image_upload: null,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image_upload') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const data = new FormData();
    data.append('title', formData.title);
    data.append('ingredients', formData.ingredients);
    data.append('steps', formData.steps);
    data.append('cooking_time', formData.cooking_time);
    data.append('difficulty_level', formData.difficulty_level);
    if (formData.image_upload) {
      data.append('image_upload', formData.image_upload);
    }

    try {
      const response = await createRecipe(data);
      setSuccess('Recipe created successfully!');
      setTimeout(() => navigate('/recipes'), 2000);
    } catch (err) {
      setError('Failed to create recipe. Please try again.');
      console.error(err);
    }
  };

  const userName = localStorage.getItem("userName") || "";
  const userEmail = localStorage.getItem("userEmail") || "";

  return (
    <div className="container mt-5">
      <div className="create-recipe">
        <div className="create-recipe__card">
          <div className="create-recipe__header">
            <h2>Create Recipe</h2>
            <p className="text-muted">Add a delicious recipe to the community.</p>
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}
          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="create-recipe__form"
          >
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="ingredients" className="form-label">
                Ingredients
              </label>
              <textarea
                className="form-control"
                id="ingredients"
                name="ingredients"
                rows="4"
                value={formData.ingredients}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="steps" className="form-label">
                Steps
              </label>
              <textarea
                className="form-control"
                id="steps"
                name="steps"
                rows="6"
                value={formData.steps}
                onChange={handleChange}
                required
              />
            </div>
            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="cooking_time" className="form-label">
                  Cooking Time
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="cooking_time"
                  name="cooking_time"
                  value={formData.cooking_time}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="difficulty_level" className="form-label">
                  Difficulty Level
                </label>
                <select
                  className="form-select"
                  id="difficulty_level"
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
            <div className="mb-3">
              <label htmlFor="image_upload" className="form-label">
                Recipe Image
              </label>
              <input
                type="file"
                className="form-control"
                id="image_upload"
                name="image_upload"
                accept="image/*"
                onChange={handleChange}
                required
              />
            </div>
            <div className="create-recipe__actions">
              <button type="submit" className="btn btn-warning">
                Create Recipe
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateRecipe;