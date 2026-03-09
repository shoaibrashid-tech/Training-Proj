import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  cart: cartReducer,
});

/* Load state from localStorage */
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("reduxState");
    if (!serializedState) return undefined;

    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Error loading state:", err);
    return undefined;
  }
};

/* Save state to localStorage */
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify({
      cart: state.cart, // persist only cart
    });

    localStorage.setItem("reduxState", serializedState);
  } catch (err) {
    console.error("Error saving state:", err);
  }
};

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: loadState(),
});

/* Subscribe after store creation */
store.subscribe(() => {
  saveState(store.getState());
});