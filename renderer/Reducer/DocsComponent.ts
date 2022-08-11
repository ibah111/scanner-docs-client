import { GridFilterModel } from "@mui/x-data-grid-premium";
import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { Doc } from "../Schemas/Doc.model";

interface DocsComponent {
  title: string;
  contact_doc_id: number;
  law_act_id: number;
  page: number;
  pageSize: number;
}
export const startComponentsState: DocsComponent = {
  title: null,
  contact_doc_id: null,
  law_act_id: null,
  page: 0,
  pageSize: 5,
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
