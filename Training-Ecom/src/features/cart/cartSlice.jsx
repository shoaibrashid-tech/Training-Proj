import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  itemList: [],
  totalQuantity: 0,
  showCart: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {

    addToCart(state, action) {
      const newItem = action.payload;

      const existingItem = state.itemList.find(
        (item) => item.id === newItem.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice =
          existingItem.price * existingItem.quantity;
      } else {
        state.itemList.push({
          ...newItem,
          quantity: 1,
          totalPrice: newItem.price,
        });
      }

      state.totalQuantity += 1;
    },

    removeFromCart(state, action) {
      const itemId = action.payload;

      const existingItem = state.itemList.find(
        (item) => item.id === itemId
      );

      if (!existingItem) return;

      if (existingItem.quantity === 1) {
        state.itemList = state.itemList.filter(
          (item) => item.id !== itemId
        );
      } else {
        existingItem.quantity -= 1;
        existingItem.totalPrice -= existingItem.price;
      }

      state.totalQuantity -= 1;
    },

    setShowCart(state) {
      state.showCart = !state.showCart;
    },
  },
});

export const { addToCart, removeFromCart, setShowCart } = cartSlice.actions;

export default cartSlice.reducer;