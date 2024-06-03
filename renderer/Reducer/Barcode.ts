import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IsString } from 'class-validator';

export class Barcode {
  @IsString()
  code: string;
}
const initialState = {
  code: '',
} as Barcode;
const BarcodeSlice = createSlice({
  name: 'Barcode',
  initialState,
  reducers: {
    setBarcodeState: (_, action: PayloadAction<Barcode>) => {
      console.log('setBarcodeState', action.payload);
      const value = action.payload;
      return value;
    },
    resetBarcodeState: () => {
      return initialState;
    },
  },
});
export const { resetBarcodeState, setBarcodeState } = BarcodeSlice.actions;
export default BarcodeSlice.reducer;
