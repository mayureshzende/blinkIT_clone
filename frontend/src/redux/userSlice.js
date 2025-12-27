import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      //   console.log("intial state in slice", state.user);
      //   console.log("action data", action);
      state.user = action.payload;
      //   console.log("updated state in slice", state.user);
    },
    logoutUser: (state) => {
      state.user = {};
    },
  },
});

// Action creators are generated for each case reducer function
export const { loginUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
