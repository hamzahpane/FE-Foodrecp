import { useState, useEffect } from "react";
import gambar from "../assets/Hero (2).jpg";
import { useAppDispatch } from "./Redux/Store/Hooks/productHook";
import {
  fetchRecipes,
  setSearchName,
} from "./Redux/Store/features/prodcutSilce";

const Hero = () => {
  const dispatch = useAppDispatch();
  // const searchName = useAppSelector((state) => state.ricepes.search_name);
  const [searchInput, setSearchInput] = useState<string>("");

  useEffect(() => {
    dispatch(fetchRecipes(searchInput));
  }, [dispatch, searchInput]);

  const handleSubmit = () => {
    dispatch(setSearchName(searchInput));
    dispatch(fetchRecipes(searchInput));
  };

  return (
    <div className="relative w-full h-96 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <img src={gambar} alt="Hero" className="w-full h-full object-cover" />

      <div className="absolute z-10 flex flex-col items-center justify-center w-full h-full text-center">
        <h1 className="text-5xl font-bebas text-white text-center">
          Best Recipes Online Learning Master
        </h1>
        <p className="text-3xl mt-2 font-bebas text-gray-200 text-center">
          Watch and learn now
        </p>
        <div className="flex items-center mt-4 p-2 border bg-white rounded-2xl">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search recipes..."
            className="flex-grow p-1 border-none focus:outline-none"
          />
          <button
            className="ml-2 p-1 bg-black text-white rounded"
            onClick={handleSubmit}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
