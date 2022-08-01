import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Doc } from "../Schemas/Doc.model";
const initialState: Doc[] = [];
const DocsSlice = createSlice({
  name: "docs",
  initialState,
  reducers: {
    setDocs(state, action: PayloadAction<Doc[]>) {
      return action.payload;
    },
    resetDocs() {
      return null;
    },
  },
});
export const { setDocs, resetDocs } = DocsSlice.actions;
export default DocsSlice.reducer;
