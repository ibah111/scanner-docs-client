import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';
import { LawExec } from '@contact/models';
import getName from '../utils/sendUtils/getName';
import datetimeNow from '../utils/sendUtils/datetimeNow';
import { DateTime } from 'luxon';
export interface DataTypes {
  debt_guarantor: null | string | number;
  fio: null | string;
  port: null | string;
  contract: null | string;
  total_sum: null | number;
  load_dt: null | DateTime;
  court_doc_num: null | string;
  executive_typ: null | string | number;
  court_date: null | DateTime;
  DELIVERY_TYP: string | number;
  entry_force_dt: null | DateTime;
  template_typ: string | number;
  receipt_recover_dt: null | DateTime;
  fssp_date: null | DateTime;
  r_court_id: string | number | null;
  dsc: null | string;
  add_interests: boolean;
  appeal_typ: string | number | null;
  person_property: number | string | null;
}
type ValueOf<T> = T[keyof T];
export type TypesData = ValueOf<DataTypes>;
export type DataNames = keyof DataTypes;
export const initState: DataTypes = {
  debt_guarantor: null,
  fio: null,
  contract: null,
  port: null,
  total_sum: null,
  load_dt: null,
  court_doc_num: null,
  executive_typ: null,
  court_date: null,
  DELIVERY_TYP: '',
  entry_force_dt: null,
  receipt_recover_dt: null,
  template_typ: '',
  fssp_date: null,
  r_court_id: '',
  dsc: null,
  add_interests: false,
  person_property: null,
  appeal_typ: null,
};
export const send = createSlice({
  name: 'send',
  initialState: { id: null, ...initState },
  reducers: {
    setSend: (state, action: PayloadAction<LawExec>) => {
      const data = action.payload;
      state.debt_guarantor = data.LawExecPersonLink?.PERSON_ID || -1;
      state.fio = getName([data!.Person!.f, data!.Person!.i, data!.Person!.o]);
      state.port = data.Portfolio!.name;
      state.contract = data.Debt!.contract;
      state.load_dt = datetimeNow();
      state.total_sum = data.total_sum;
      state.court_doc_num = data.court_doc_num;
      state.executive_typ = data.executive_typ;
      state.court_date = data.court_date;
      state.DELIVERY_TYP = 1;
      state.template_typ = 16;
      state.entry_force_dt = data.entry_force_dt;
      state.receipt_recover_dt = data.receipt_recover_dt;
      state.fssp_date = datetimeNow();
      state.r_court_id = data.r_court_id;
      state.dsc = data.dsc;
      state.add_interests = false;
      state.appeal_typ = null;
      state.person_property = data.deposit_typ
        ? data.Debt?.PersonProperties?.[0]?.id || null
        : null;
    },
    setData<K extends DataNames>(
      state: Draft<DataTypes>,
      action: { payload: [K, DataTypes[K]] },
    ) {
      state[action.payload[0]] = action.payload[1];
    },
    setId: (state, action) => {
      state.id = action.payload;
    },
    reset: (state) => {
      return { id: state.id, ...initState };
    },
  },
});
export const { setData, setSend, reset, setId } = send.actions;
export default send.reducer;
