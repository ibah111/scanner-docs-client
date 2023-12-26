import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OptionsObject } from 'notistack';

interface MessageState {
  message: string;
  options: OptionsObject;
}
const startMessageState: MessageState[] = [];
const initialState = startMessageState;
const MessageSlice = createSlice({
  name: 'Message',
  initialState,
  reducers: {
    addMessage(state: MessageState[], action: PayloadAction<MessageState>) {
      state.push(action.payload);
    },
    resetMessage() {
      return startMessageState;
    },
  },
});
export const { addMessage, resetMessage } = MessageSlice.actions;
export default MessageSlice.reducer;
