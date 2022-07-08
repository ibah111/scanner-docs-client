import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OptionsObject } from "notistack";

interface MessageState {
  message: string;
  params: OptionsObject;
}
const startMessageState: MessageState[] = [];
const initialState = startMessageState;
const MessageSlice = createSlice({
  name: "Message",
  initialState,
  reducers: {
    callError(state, action: PayloadAction<string>) {
      state.push({ message: action.payload, params: { variant: "error" } });
    },
    resetMessage() {
      return startMessageState;
    },
  },
});
export const { callError, resetMessage } = MessageSlice.actions;
export default MessageSlice.reducer;
