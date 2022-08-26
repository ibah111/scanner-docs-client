import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Transmit } from "../Schemas/Transmit.model";

const initialState: Transmit[] = [];
const TransmitSlice = createSlice({
  name: "file",
  initialState,
  reducers: {
    setTransmit(state, action: PayloadAction<Transmit[]>) {
      return action.payload;
    },
    resetTransmit() {
      return null;
    },
  },
});
export const { setTransmit, resetTransmit } = TransmitSlice.actions;
export default TransmitSlice.reducer;
