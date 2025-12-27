import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  allProducts: [],
  CartProducts: [],
};

export const productSlice = createSlice({
  name: "allProducts",
  initialState,
  reducers: {
    getAllProducts: (state, action) => {
      //   console.log("intial product state", state);
      //   console.log("action payload ", action.payload);
      state.allProducts = action.payload;
    },
    addToCart: (state, action) => {
      // console.log("adding to cart", action.payload);
      // console.log("adding to cart", action.payload._id);
      const prouctPresent = state.CartProducts.findIndex(
        (item) => item._id === action.payload._id
      );
      // console.log(prouctPresent);
      if (prouctPresent >= 0) {
        toast("Product Already present in the Cart.");
      } else {
        state.CartProducts.push(action.payload);
        toast.success("Product added to the Cart.");
      }
      // console.log("cart items are ", state.CartProducts);
    },
    deleteFromCart: (state, action) => {
      // console.log("deleting from cart", action.payload);
      const itemsfiltered = state.CartProducts.filter(
        (item) => item._id !== action.payload
      );
      state.CartProducts = itemsfiltered;
      // console.log(state.CartProducts, " after deleting the product");
    },
    increaseQnty: (state, action) => {
      // console.log("increasing quantity", action.payload);
      const product = action.payload;
      const foundProductID = state.CartProducts.findIndex(
        (item) => item._id === product
      );
      // console.log(foundProductID);
      // console.log(state.CartProducts[foundProductID]);

      if (foundProductID >= 0 && state.CartProducts[foundProductID].quantity) {
        state.CartProducts[foundProductID].quantity += 1;
      } else {
        state.CartProducts[foundProductID].quantity = 1;
        // foundProduct["quantity"] = 1;
      }
      // console.log("new quantity", state.CartProducts[foundProductID]);

      const totalPrice =
        state.CartProducts[foundProductID].quantity *
        state.CartProducts[foundProductID].price;
      state.CartProducts[foundProductID].TotalPrice = totalPrice;
    },
    decreaseQnty: (state, action) => {
      // console.log("decreasing quantity", action.payload);
      const product = action.payload;
      const foundProductID = state.CartProducts.findIndex(
        (item) => item._id === product
      );
      // console.log(foundProductID);
      // console.log(state.CartProducts[foundProductID]);

      if (
        foundProductID >= 0 &&
        state.CartProducts[foundProductID].quantity >= 1
      ) {
        state.CartProducts[foundProductID].quantity -= 1;
      } else {
        state.CartProducts[foundProductID].quantity = 0;
        // foundProduct["quantity"] = 1;
      }
      // console.log("new quantity", state.CartProducts[foundProductID]);

      const totalPrice =
        state.CartProducts[foundProductID].quantity *
        state.CartProducts[foundProductID].price;
      state.CartProducts[foundProductID].TotalPrice = totalPrice;
    },
  },
});

export const {
  getAllProducts,
  addToCart,
  deleteFromCart,
  increaseQnty,
  decreaseQnty,
} = productSlice.actions;
export default productSlice.reducer;
