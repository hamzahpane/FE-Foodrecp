import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface Recipe {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  difficulty: string;
  cuisine: string;
  caloriesPerServing: number;
  tags: string[]; // Pastikan ini benar
  userId: number;
  image: string;
  rating: number;
  reviewCount: number;
  mealType: string[];
}

interface StateRecipe {
  recipes: Recipe[];
  status: "idle" | "loading" | "succeeded" | "failed";
  tags: string[];
  error: string | null;
  currentPage: number;
  search_name: string;
  pageSize: number;
}

export const fetchTags = createAsyncThunk<string[]>(
  "recipes/fetchTags",
  async () => {
    const response = await fetch("https://dummyjson.com/recipes/tags");
    const data = await response.json();
    return data;
  }
);

export const fetchRecipes = createAsyncThunk<Recipe[], string>(
  "recipes/fetchRecipes",
  async (searchName) => {
    const response = await axios.get(
      `https://dummyjson.com/recipes/search?q=${searchName}`
    );
    // console.log(response.data); // Tambahkan ini untuk melihat data respons
    return response.data.recipes; // Pastikan format data sesuai
  }
);

const initialState: StateRecipe = {
  recipes: [],
  tags: [],
  status: "idle",
  error: null,
  currentPage: 1,
  pageSize: 8,
  search_name: "",
};

const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setSearchName: (state, action) => {
      state.search_name = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.recipes = action.payload; // Simpan resep dari API
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something went wrong";
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.tags = action.payload;
      });
  },
});

export const selectAllRecipes = (state: { recipes: StateRecipe }) =>
  state.recipes.recipes;

export const selectCurrentPage = (state: { recipes: StateRecipe }) =>
  state.recipes.currentPage;

export const { setPage, setSearchName } = recipesSlice.actions;

export default recipesSlice.reducer;
