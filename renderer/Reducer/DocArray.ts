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
    setDocArray(_, action: PayloadAction<Doc[]>) {
      console.log('action.payload: ', action.payload);
      return action.payload;
    },
    resetDocArray() {
      console.log('DocArray reset');
      return initialState;
    },
  },
});
export const { setDocArray, resetDocArray } = DataSlice.actions;
export default DataSlice.reducer;
