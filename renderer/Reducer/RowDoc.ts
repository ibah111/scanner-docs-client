import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Doc } from '../Schemas/Doc.model';
export interface RowDocState {
  count: number;
  rows: Doc[];
}

const initialState: RowDocState = { count: 0, rows: [] };
const RowDocSlice = createSlice({
  name: 'RowDoc',
  initialState,
  reducers: {
    setRowDoc(state, action: PayloadAction<RowDocState>) {
      return action.payload;
    },
    addDoc(state, action: PayloadAction<Doc>) {
      state.rows.push(action.payload);
      state.count++;
    },
    resetRowDoc() {
      return initialState;
    },
  },
});
export const { setRowDoc, resetRowDoc, addDoc } = RowDocSlice.actions;
export default RowDocSlice.reducer;
