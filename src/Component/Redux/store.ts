import { configureStore } from "@reduxjs/toolkit";
import recipesReducer from "./Store/features/prodcutSilce";

const store = configureStore({
  reducer: {
    ricepes: recipesReducer,
  },
});

export type RooteState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
