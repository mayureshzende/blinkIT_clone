import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "./userSlice";
import productSliceReducer from "./productSlice";
export const reduxStore = configureStore({
  reducer: {
    userData: userSliceReducer,
    allProductsData: productSliceReducer,
  },
});
