import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Barcode } from "../Schemas/Barcode.model";
const initialState: Barcode = null;
const DataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setData(state, action: PayloadAction<Barcode>) {
      return action.payload;
    },
    resetData() {
      return null;
    },
  },
});
export const { setData, resetData } = DataSlice.actions;
export default DataSlice.reducer;
