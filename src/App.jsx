import Navbar from "./components/Navbar"

import Home from "./pages/Home"
import Recipes from "./pages/Recipes"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import CreateRecipe from "./pages/CreateRecipe"
import RecipeDetail from "./pages/RecipeDetail"
import EditRecipe from "./pages/EditRecipe"
import MyRecipes from "./pages/MyRecipes"

import { Routes, Route } from "react-router-dom"

function App() {
  return (
    <>
      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/recipes" element={<Recipes />} />

        <Route path="/recipes/:id" element={<RecipeDetail />} />
        <Route path="/recipes/:id/edit" element={<EditRecipe />} />
        <Route path="/my-recipes" element={<MyRecipes />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/create" element={<CreateRecipe />} />

      </Routes>
    </>
  )
}

export default App