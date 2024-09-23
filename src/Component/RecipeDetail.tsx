import { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import {
  useAppSelector,
  useAppDispatch,
} from "./Redux/Store/Hooks/productHook";

import { FaArrowLeftLong } from "react-icons/fa6";
import { fetchRecipes } from "./Redux/Store/features/prodcutSilce";

const RecipeDetail = () => {
  const dispatch = useAppDispatch();
  const { recipeId } = useParams<{ recipeId: string }>();
  const recipes = useAppSelector((state) => state.ricepes.recipes);
  const recipesStatus = useAppSelector((state) => state.ricepes.status);

  // Fetch recipes if not already loaded
  useEffect(() => {
    if (recipesStatus === "idle") {
      dispatch(fetchRecipes(""));
    }
  }, [recipesStatus, dispatch]);

  // Find the recipe based on ID
  const recipe = recipes.find((r) => r.id === parseInt(recipeId || "", 10));

  useEffect(() => {
    console.log("Recipe ID:", recipeId);
    console.log("Available Recipes:", recipes);
    if (!recipe) {
      console.log("Recipe not found");
    }
  }, [recipeId, recipes, recipe]);

  // Loading state
  if (recipesStatus === "loading") {
    return <div className="text-center">Loading...</div>;
  }

  if (!recipe) {
    return <div className="text-center">Recipe not found.</div>;
  }

  return (
    <div>
      <div className="p-3 border rounded-md bg-black flex items-center text-white font-bebas">
        <NavLink to="/" className="text-white">
          <FaArrowLeftLong size={24} className="mr-2" />
        </NavLink>
        <h1 className="text-xl font-bold">{recipe.name}</h1>
      </div>
      <div className="p-2">
        <img
          src={recipe.image}
          alt={recipe.name}
          className="w-full h-80 object-cover"
        />
        <h2 className="text-xl mt-4 font-bebas">Ingredients:</h2>
        <ul className="flex gap-1 font-bebas">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index} className="text-gray-600">
              {ingredient}
            </li>
          ))}
        </ul>
        <h2 className="text-xl font-bebas mt-4">Instructions:</h2>
        <div className="text-gray-700 font-bebas">
          {recipe.instructions.map((instruction, index) => (
            <p key={index} className="mb-2">
              {instruction}
            </p>
          ))}
        </div>
        <div className="font-bebas">
          <p>
            Prep Time:{" "}
            <span className="text-gray-700">{recipe.prepTimeMinutes}</span>
            minutes
          </p>
          <p>Cook Time: {recipe.cookTimeMinutes} minutes</p>
          <p>Servings: {recipe.servings}</p>
        </div>
      </div>
      <footer className="mt-4 p-4 bg-black text-white text-center">
        <p>&copy; {new Date().getFullYear()} Your Recipe App</p>
      </footer>
    </div>
  );
};

export default RecipeDetail;
