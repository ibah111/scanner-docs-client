import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  name: '',
  contract: '',
};
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
    resetSearch: () => {
      return initialState;
    },
  },
});
export const { setName, setContract, resetSearch } = search.actions;
export default search.reducer;
