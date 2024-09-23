import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Home from "./Page/Home";
import { Provider } from "react-redux";
import store from "./Component/Redux/store";
import RecipeDetail from "./Component/RecipeDetail";
import RecipeList from "./Component/RecipeList";

// Perbaikan rute
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/recipe/:recipeId", // Perbaiki dari `path="/recipe/:recipeId"`
    element: <RecipeDetail />, // Perbaiki dari `element={<RecipeDetail />}`
  },
  {
    path: "/Recipelist",
    element: <RecipeList />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
