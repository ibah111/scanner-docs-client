import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Doc } from '../Schemas/Doc.model';
export interface DocsState {
  count: number;
  rows: Doc[];
}

const initialState: DocsState = { count: 0, rows: [] };
const DocsSlice = createSlice({
  name: 'docs',
  initialState,
  reducers: {
    setDocs(state, action: PayloadAction<DocsState>) {
      return action.payload;
    },
    addDoc(state, action: PayloadAction<Doc>) {
      state.rows.push(action.payload);
      state.count++;
    },
    resetDocs() {
      return initialState;
    },
  },
});
export const { setDocs, resetDocs, addDoc } = DocsSlice.actions;
export default DocsSlice.reducer;
