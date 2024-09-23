import { useEffect, useState } from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "./Redux/Store/Hooks/productHook";
import { fetchRecipes, setPage } from "./Redux/Store/features/prodcutSilce";
import Tags from "./Tags";
import { Link } from "react-router-dom";

const RecipeList = () => {
  const dispatch = useAppDispatch();
  const recipes = useAppSelector((state) => state.ricepes.recipes);
  const recipesStatus = useAppSelector((state) => state.ricepes.status);
  const error = useAppSelector((state) => state.ricepes.error);
  const currentPage = useAppSelector((state) => state.ricepes.currentPage);
  const pageSize = useAppSelector((state) => state.ricepes.pageSize);
  const search_name = useAppSelector((state) => state.ricepes.search_name);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  useEffect(() => {
    if (recipesStatus === "idle" || search_name) {
      dispatch(fetchRecipes(search_name));
    }
  }, [recipesStatus, search_name, dispatch]);

  const filteredRecipes = selectedTag
    ? recipes.filter((recipe) => recipe.tags.includes(selectedTag))
    : recipes;

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const displayRecipes = filteredRecipes.slice(startIndex, endIndex);

  if (recipesStatus === "loading") {
    return <div className="text-center">Loading recipes...</div>;
  } else if (recipesStatus === "failed") {
    return <div className="text-center text-red-600">Error: {error}</div>;
  }

  const handlePageChange = (page: number) => {
    const totalPages = Math.ceil(filteredRecipes.length / pageSize);
    if (page > 0 && page <= totalPages) {
      dispatch(setPage(page));
    }
  };

  const totalPages = Math.ceil(filteredRecipes.length / pageSize);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="p-3">
      <h1 className="font-bebas text-center mt-4 text-2xl mb-3 text-black">
        Recipe List
      </h1>
      <Tags onTagClick={setSelectedTag} />
      <div className="flex flex-wrap justify-center gap-4">
        {displayRecipes.length > 0 ? (
          displayRecipes.map((recipe) => (
            <div
              key={recipe.id}
              className="max-w-sm w-80 h-80 bg-white shadow-lg rounded-lg overflow-hidden font-bebas"
            >
              <img
                src={recipe.image}
                alt={recipe.name}
                className="w-full h-40 object-cover"
              />
              <h2 className="text-center font-bold">{recipe.name}</h2>
              <div className="p-2 text-gray-600 text-sm">
                <p>Tags: {recipe.tags.join(", ")}</p>
                <p>Rating: {recipe.rating}</p>
                <p>Calories: {recipe.caloriesPerServing} kcal</p>
                <Link to={`/recipe/${recipe.id}`}>
                  <button className="p-2 border bg-black mt-2 text-white rounded-md font-bebas">
                    See the recipe
                  </button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">No recipes found.</div>
        )}
      </div>
      <div className="flex justify-center gap-2 mt-4">
        {totalPages > 1 &&
          pageNumbers.map((number) => (
            <button
              key={number}
              className={`px-4 py-2 ${
                currentPage === number
                  ? "bg-black text-white"
                  : "bg-white text-black font-serif border"
              } mx-1 rounded`}
              onClick={() => handlePageChange(number)}
            >
              {number}
            </button>
          ))}
        <button
          className="px-4 py-2 border bg-black text-white font-serif rounded-r"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          className="px-4 py-2 border bg-black text-white font-serif rounded-l"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default RecipeList;
