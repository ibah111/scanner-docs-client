import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';

interface BoxsState {
  create: boolean;
}
export const startBoxsState: BoxsState = {
  create: false,
};
const initialState = startBoxsState;
const BosxSlice = createSlice({
  name: 'box',
  initialState,
  reducers: {
    setBox<T extends keyof BoxsState>(
      state: Draft<BoxsState>,
      action: PayloadAction<[T, BoxsState[T]]>,
    ) {
      state[action.payload[0]] = action.payload[1];
    },
    resetBox() {
      return startBoxsState;
    },
  },
});
export const { setBox, resetBox } = BosxSlice.actions;
export default BosxSlice.reducer;
