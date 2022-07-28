import { createSlice } from "@reduxjs/toolkit";

export const token = createSlice({
  name: "Token",
  initialState: { token: 0 },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});
export const { setToken } = token.actions;
export default token.reducer;
