import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";

interface SendData {
  DateSend?: string;
  WhereSend: string;
}
const initialState: SendData = {
  WhereSend: "",
};
const SendSlice = createSlice({
  name: "Send",
  initialState,
  reducers: {
    setData<T extends keyof SendData>(
      state: Draft<SendData>,
      action: PayloadAction<[T, SendData[T]]>
    ) {
      state[action.payload[0]] = action.payload[1];
    },
  },
});
export const { setData } = SendSlice.actions;
export default SendSlice.reducer;
