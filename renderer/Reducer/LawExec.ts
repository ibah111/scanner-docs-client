import { LawExec } from '@contact/models';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
const initialState = null as LawExec | null;
const LawExecSlice = createSlice({
  name: 'LawExec',
  initialState,
  reducers: {
    setLawExec: (state, action: PayloadAction<LawExec | null>) =>
      action.payload,
  },
});
export const { setLawExec } = LawExecSlice.actions;
export default LawExecSlice.reducer;
