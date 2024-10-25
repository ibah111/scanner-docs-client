import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';
class CommentInstance {
  LawActComment: string;
  LawExecComment: string;
}

const initialState: { LawActComment: string; LawExecComment: string } = {
  LawActComment: '',
  LawExecComment: '',
};
export const comment = createSlice({
  name: 'Comment',
  initialState,
  reducers: {
    setCommentProperty<T extends keyof CommentInstance>(
      state: Draft<CommentInstance>,
      action: PayloadAction<[T, CommentInstance[T]]>,
    ) {
      state[action.payload[0]] = action.payload[1];
    },
    ResetComment: () => {
      return initialState;
    },
  },
});
export const { setCommentProperty, ResetComment } = comment.actions;
export default comment.reducer;
