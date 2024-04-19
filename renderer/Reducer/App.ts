import { createSlice } from '@reduxjs/toolkit';
export const location = createSlice({
  name: 'App',
  initialState: { location: '/', minApp: false, timeout: 0 },
  reducers: {
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    setApp: (state, action) => {
      state.minApp = action.payload;
    },
    setTime: (state, action) => {
      state.timeout = action.payload;
    },
  },
});
export const { setLocation, setApp, setTime } = location.actions;
export default location.reducer;
