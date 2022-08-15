import { GridFilterModel } from "@mui/x-data-grid-premium";
import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";

interface DocsComponent {
  filterModel: GridFilterModel;
  page: number;
  pageSize: number;
}
export const startComponentsState: DocsComponent = {
  filterModel: { items: [] },
  page: 0,
  pageSize: 25,
};

const initialState = startComponentsState;
const ComponentSlise = createSlice({
  name: "DocsComponent",
  initialState,
  reducers: {
    setComponents<T extends keyof DocsComponent>(
      state: Draft<DocsComponent>,
      action: PayloadAction<[T, DocsComponent[T]]>
    ) {
      state[action.payload[0]] = action.payload[1];
    },
    resetComponents() {
      return startComponentsState;
    },
  },
});
export const { setComponents, resetComponents } = ComponentSlise.actions;
export default ComponentSlise.reducer;
