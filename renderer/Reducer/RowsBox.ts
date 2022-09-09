import { GridFilterModel, GridSortModel } from '@mui/x-data-grid-premium';
import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';

interface RowsBox {
  filterModel: GridFilterModel;
  sortModel: GridSortModel;
  page: number;
  pageSize: number;
}
export const startRowsState: RowsBox = {
  filterModel: { items: [] },
  sortModel: [],
  page: 0,
  pageSize: 25,
};

const initialState = startRowsState;
const RowsBoxSlise = createSlice({
  name: 'RowsBox',
  initialState,
  reducers: {
    setRowsBox<T extends keyof RowsBox>(
      state: Draft<RowsBox>,
      action: PayloadAction<[T, RowsBox[T]]>,
    ) {
      state[action.payload[0]] = action.payload[1];
    },
    resetRowsBox() {
      return startRowsState;
    },
  },
});
export const { setRowsBox, resetRowsBox } = RowsBoxSlise.actions;
export default RowsBoxSlise.reducer;
