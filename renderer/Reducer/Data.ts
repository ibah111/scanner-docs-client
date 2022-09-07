import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DocData } from '../Schemas/DocData.model';
const initialState: DocData = null;
const DataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setData(state, action: PayloadAction<DocData>) {
      return action.payload;
    },
    resetData() {
      return null;
    },
  },
});
export const { setData, resetData } = DataSlice.actions;
export default DataSlice.reducer;
