import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OptionsObject } from 'notistack';

interface MessageState {
  text: string | null;
  params?: OptionsObject;
}
const initialState: MessageState[] = [];
const MessageSlice = createSlice({
  name: 'Message',
  initialState,
  reducers: {
    callError(state, action: PayloadAction<string>) {
      state.push({ text: action.payload, params: { variant: 'error' } });
    },
    callSuccess(state, action: PayloadAction<string>) {
      state.push({ text: action.payload, params: { variant: 'success' } });
    },
    callWarning(state, action: PayloadAction<string>) {
      state.push({ text: action.payload, params: { variant: 'warning' } });
    },
    resetMessage() {
      return initialState;
    },
  },
});
export const { callError, callSuccess, callWarning, resetMessage } =
  MessageSlice.actions;
export default MessageSlice.reducer;
