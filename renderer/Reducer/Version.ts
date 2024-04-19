import { createSlice } from '@reduxjs/toolkit';
export const location = createSlice({
  name: 'Version',
  initialState: { version: 'Initial version state' },
  reducers: {
    setVersion: (state, action) => {
      action.payload = state.version;
    },
  },
});
export const { setVersion } = location.actions;
export default location.reducer;
