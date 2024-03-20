import { createSlice } from '@reduxjs/toolkit';
const initialState: { LawAct: string; LawExec: string } = {
  LawAct: '',
  LawExec: '',
};
export const comment = createSlice({
  name: 'Comment',
  initialState,
  reducers: {
    setLawActComment: (state, action) => {
      state.LawAct = action.payload;
    },
    setLawExecComment: (state, action) => {
      state.LawExec = action.payload;
    },
    ResetComment: () => {
      return initialState;
    },
  },
});
export const { setLawActComment, setLawExecComment, ResetComment } =
  comment.actions;
export default comment.reducer;
