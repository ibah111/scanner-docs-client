import { GridFilterModel, GridSortModel } from '@mui/x-data-grid-premium';
import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';

interface UserList {
  filterModel: GridFilterModel;
  sortModel: GridSortModel;
  page: number;
  pageSize: number;
}
export const userListState: UserList = {
  filterModel: { items: [] },
  sortModel: [],
  page: 0,
  pageSize: 25,
};

const initialState = userListState;
const UserListSlice = createSlice({
  name: 'RowsBox',
  initialState,
  reducers: {
    setRowsBox<T extends keyof UserList>(
      state: Draft<UserList>,
      action: PayloadAction<[T, UserList[T]]>,
    ) {
      state[action.payload[0]] = action.payload[1];
    },
    resetRowsBox() {
      return initialState;
    },
  },
});
export const { setRowsBox, resetRowsBox } = UserListSlice.actions;
export default UserListSlice.reducer;
