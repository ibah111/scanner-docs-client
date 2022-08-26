import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Log } from '../Schemas/Log.model';

const initialState: Log[] = [];
const TransmitSlice = createSlice({
  name: 'file',
  initialState,
  reducers: {
    setTransmit(state, action: PayloadAction<Log[]>) {
      return action.payload;
    },
    resetTransmit() {
      return null;
    },
  },
});
export const { setTransmit, resetTransmit } = TransmitSlice.actions;
export default TransmitSlice.reducer;
