import { createSlice } from '@reduxjs/toolkit';
export const search = createSlice({
  name: 'Search',
  initialState: { name: '', contract: '' },
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setContract: (state, action) => {
      state.contract = action.payload;
    },
  },
});
export const { setName, setContract } = search.actions;
export default search.reducer;
