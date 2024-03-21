import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LawExecPlain } from '../apiSend/search';

const initialState: {
  reload: boolean;
  loading: boolean;
  data: LawExecPlain[];
} = {
  loading: false,
  data: [],
  reload: false,
};
export const results = createSlice({
  name: 'Results',
  initialState: initialState,
  reducers: {
    setResults: (state, action: PayloadAction<LawExecPlain[]>) => {
      state.data = action.payload;
    },
    setLoadingResults: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setReloadResults: (state, action: PayloadAction<boolean>) => {
      state.reload = action.payload;
    },
    ReloadResults: (state) => {
      state.reload = true;
    },
  },
});
export const {
  setResults,
  setLoadingResults,
  setReloadResults,
  ReloadResults,
} = results.actions;
export default results.reducer;
