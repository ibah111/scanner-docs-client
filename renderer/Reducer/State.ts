import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  login: false,
};
export const StateSlice = createSlice({
  name: 'State',
  initialState,
  reducers: {
    resetLogin: (state) => {
      state.login = true;
    },
    setState: (state, action: PayloadAction<[string, boolean]>) => {
      state[action.payload[0]] = action.payload[1];
    },
  },
});
export const { resetLogin, setState } = StateSlice.actions;
export default StateSlice.reducer;
