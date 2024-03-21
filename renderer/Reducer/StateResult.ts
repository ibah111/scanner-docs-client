import { GridInitialStatePremium } from '@mui/x-data-grid-premium/models/gridStatePremium';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
const initialState: {
  page: GridInitialStatePremium;
  create: GridInitialStatePremium;
  debt: GridInitialStatePremium;
  debt_calc: GridInitialStatePremium;
  documents: GridInitialStatePremium;
} = {
  page: {},
  create: {},
  debt: {},
  debt_calc: {},
  documents: {},
};
export const StateResults = createSlice({
  name: 'StateResults',
  initialState,
  reducers: {
    setPageState: (state, action: PayloadAction<GridInitialStatePremium>) => {
      state.page = action.payload;
    },
    setCreateState: (state, action: PayloadAction<GridInitialStatePremium>) => {
      state.create = action.payload;
    },
    setDebtState: (state, action: PayloadAction<GridInitialStatePremium>) => {
      state.debt = action.payload;
    },
    setDebtCalcState: (
      state,
      action: PayloadAction<GridInitialStatePremium>,
    ) => {
      state.debt_calc = action.payload;
    },
    setDocumentsState: (
      state,
      action: PayloadAction<GridInitialStatePremium>,
    ) => {
      state.documents = action.payload;
    },
  },
});
export const {
  setPageState,
  setCreateState,
  setDebtState,
  setDebtCalcState,
  setDocumentsState,
} = StateResults.actions;
export default StateResults.reducer;
