import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OptionsObject } from 'notistack';

interface MessageState {
  text: string | null;
  params?: OptionsObject;
}
const startMessageState: MessageState[] = [];
const initialState = startMessageState;
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
    addMessage(state: MessageState[], action: PayloadAction<MessageState>) {
      state.push(action.payload);
    },
    resetMessage() {
      return startMessageState;
    },
  },
});
export const { ...funcs } = MessageSlice.actions;
export default MessageSlice.reducer;
