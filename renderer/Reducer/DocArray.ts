import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Doc } from '../Schemas/Doc.model';
/**
 * Scan Data
 */
const initialState: Doc[] = [];
const DataSlice = createSlice({
  name: 'doc',
  initialState,
  reducers: {
    setDoc(state, action: PayloadAction<Doc[]>) {
      return action.payload;
    },
    resetDoc() {
      return initialState;
    },
  },
});
export const { setDoc, resetDoc } = DataSlice.actions;
export default DataSlice.reducer;
