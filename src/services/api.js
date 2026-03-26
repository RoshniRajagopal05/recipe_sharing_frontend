import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

API.interceptors.request.use((config) => {

  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }

  return config;

});

export const signupUser = (data) => API.post("signup/", data);

export const loginUser = (data) => API.post("login/", data);

export const getRecipes = () => API.get("recipes/");

export const getRecipe = (id) => API.get(`recipe_detail/${id}/`);

export const getMyRecipes = () => API.get("my_recipes/");
export const createRecipe = (data) => API.post("createrecipe/", data, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export const updateRecipe = (data) =>
  API.put("update_recipe/", data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

export const deleteRecipe = (id) => API.delete(`delete_recipe/${id}/`);

export default API;