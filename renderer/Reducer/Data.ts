import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Doc } from '../Schemas/Doc.model';
const initialState: Doc[] = [];
const DataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setData(state, action: PayloadAction<Doc[]>) {
      return action.payload;
    },
    resetData() {
      return [];
    },
  },
});
export const { setData, resetData } = DataSlice.actions;
export default DataSlice.reducer;
