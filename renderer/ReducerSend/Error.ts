import { createSlice, Draft } from '@reduxjs/toolkit';
export type ErrorTypes = {
  fio: null | string;
  port: null | string;
  contract: null | string;
  total_sum: null | string;
  load_dt: null | string;
  court_doc_num: null | string;
  executive_typ: null | string;
  court_date: null | string;
  DELIVERY_TYP: null | string;
  entry_force_dt: null | string;
  template_typ: null | string;
  receipt_recover_dt: null | string;
  fssp_date: null | string;
  add_interests: null | string;
  r_court_id: null | string;
  dsc: null | string;
  debt_guarantor: null | string;
  person_property: null | string;
  appeal_typ: null | string;
};
type ValueOf<T> = T[keyof T];
export type TypesError = ValueOf<ErrorTypes>;
export type ErrorNames = keyof ErrorTypes;
export const initState: ErrorTypes = {
  fio: null,
  port: null,
  contract: null,
  total_sum: null,
  load_dt: null,
  court_doc_num: null,
  executive_typ: null,
  court_date: null,
  DELIVERY_TYP: null,
  entry_force_dt: null,
  receipt_recover_dt: null,
  template_typ: null,
  fssp_date: null,
  r_court_id: null,
  dsc: null,
  add_interests: null,
  debt_guarantor: null,
  person_property: null,
  appeal_typ: null,
};
export const error = createSlice({
  name: 'error',
  initialState: initState,
  reducers: {
    setError<K extends ErrorNames>(
      state: Draft<ErrorTypes>,
      action: { payload: [K, ErrorTypes[K]] },
    ) {
      state[action.payload[0]] = action.payload[1];
    },
    reset: () => {
      return initState;
    },
  },
});
export const { setError, reset } = error.actions;
export default error.reducer;
