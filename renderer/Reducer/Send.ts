import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";

interface SendData {
  DateSend?: string;
  WhereSend: string;
}
export const startSendState: SendData = {
  WhereSend: "",
};
const initialState = startSendState;
const SendSlice = createSlice({
  name: "Send",
  initialState,
  reducers: {
    setSend<T extends keyof SendData>(
      state: Draft<SendData>,
      action: PayloadAction<[T, SendData[T]]>
    ) {
      state[action.payload[0]] = action.payload[1];
    },
    resetSend() {
      return startSendState;
    },
  },
});
export const { setSend, resetSend } = SendSlice.actions;
export default SendSlice.reducer;
