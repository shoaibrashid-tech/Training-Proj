import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";


const loadState = () => {
  try {
    const serializedState = localStorage.getItem("cart");
    if (serializedState === null) return undefined;
    
    const parsedState = JSON.parse(serializedState);
    
    // Safety check: ensure itemList exists and is an array
    if (!parsedState || !Array.isArray(parsedState.itemList)) {
      return undefined;
    }
    
    return parsedState;
  } catch (err) {
    console.error("Could not load cart state", err);
    return undefined; // Return undefined to trigger fallback to default state
  }
};

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  preloadedState: {
    cart: loadState(), 
  },
});

store.subscribe(() => {
  localStorage.setItem("cart", JSON.stringify(store.getState().cart));
});