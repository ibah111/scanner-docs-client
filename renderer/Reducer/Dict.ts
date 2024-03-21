import { Dict } from '@contact/models';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
const initialState: Record<number, Dict[]> = {};
const DictSlice = createSlice({
  name: 'Dict',
  initialState,
  reducers: {
    setDict: (state, action: PayloadAction<Dict[]>) => {
      if (action.payload.length > 0) {
        state[action.payload[0].parent_id] = action.payload;
      }
    },
  },
});
export const { setDict } = DictSlice.actions;
export default DictSlice.reducer;
