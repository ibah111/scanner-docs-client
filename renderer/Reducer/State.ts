import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  requireLogin: false,
};
export const StateSlice = createSlice({
  name: 'State',
  initialState,
  reducers: {
    relogin: (state) => {
      state.requireLogin = true;
    },
    loged: (state) => {
      state.requireLogin = false;
    },
  },
});
export const { relogin, loged } = StateSlice.actions;
export default StateSlice.reducer;
