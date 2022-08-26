import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { File } from '../Schemas/File.model';

const initialState: File = null;
const FileSlice = createSlice({
  name: 'file',
  initialState,
  reducers: {
    setFile(state, action: PayloadAction<File>) {
      return action.payload;
    },
    resetFile() {
      return null;
    },
  },
});
export const { setFile, resetFile } = FileSlice.actions;
export default FileSlice.reducer;
