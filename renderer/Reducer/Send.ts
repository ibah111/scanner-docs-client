import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';
import { LawExec } from '@contact/models';
import { DateTime } from 'luxon';
import getName from '../utils/sendUtils/getName';
import datetimeNow from '../utils/sendUtils/datetimeNow';
export interface DataTypes {
  r_person_id: null | number;
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
  start_date: null | DateTime;
  r_court_name: string | null;
  r_court_id: string | number | null;
  dsc: null | string;
  appeal_typ: string | number | null;
  person_property: number | string | null;
  add_interests: boolean;
  custom_requisites_id: number;
  court_sum: null | number;
  exec_number: null | string;
  debt_payments_sum: null | number;
  list_egrul: null | boolean;
  rename_notification: null | boolean;
}
type ValueOf<T> = T[keyof T];
export type TypesData = ValueOf<DataTypes>;
export type DataNames = keyof DataTypes;
export const initState: DataTypes = {
  r_person_id: null,
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
  start_date: null,
  r_court_name: '',
  r_court_id: '',
  dsc: null,
  person_property: null,
  appeal_typ: null,
  add_interests: false,
  custom_requisites_id: 0,
  court_sum: null,
  exec_number: '',
  debt_payments_sum: null,
  list_egrul: null,
  rename_notification: null,
};
export const send = createSlice({
  name: 'send',
  initialState: { id: null, ...initState },
  reducers: {
    setSend: (state, action: PayloadAction<LawExec>) => {
      const data = action.payload;
      state.r_person_id = data.r_person_id;
      state.debt_guarantor = data.LawExecPersonLink?.PERSON_ID || -1;
      state.fio = getName([data!.Person!.f, data!.Person!.i, data!.Person!.o]);
      state.port = data.Portfolio!.name;
      state.contract = data.Debt!.contract;
      state.load_dt = datetimeNow();
      state.total_sum = data.total_sum;
      state.court_doc_num = data.court_doc_num;
      state.executive_typ = data.executive_typ;
      //@ts-expect-error ///
      state.court_date = data.court_date;
      state.DELIVERY_TYP = 1;
      state.template_typ = 16;
      //@ts-expect-error ///
      state.entry_force_dt = data.entry_force_dt;
      //@ts-expect-error ///
      state.receipt_recover_dt = data.receipt_recover_dt;
      state.fssp_date = datetimeNow();
      state.r_court_id = data.r_court_id;
      state.dsc = data.dsc;
      state.add_interests = false;
      state.appeal_typ = null;
      state.person_property = data.deposit_typ
        ? data.Debt?.PersonProperties?.[0]?.id || null
        : null;
      state.exec_number = data.LawAct ? data.LawAct.exec_number : '';
      state.court_sum = data.LawAct!.court_sum ? data.LawAct!.court_sum : null;
      state.debt_payments_sum =
        data.Debt!.DebtCalcs!.length > 0
          ? data
              .Debt!.DebtCalcs!.map((item) => item.sum)
              .reduce((prev, curr) => prev + curr)
          : 0;
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
      return {
        id: state.id,
        r_person_id: initState.r_person_id,
        debt_guarantor: initState.debt_guarantor,
        fio: initState.fio,
        contract: initState.contract,
        port: initState.port,
        total_sum: initState.total_sum,
        load_dt: initState.load_dt,
        court_doc_num: initState.court_doc_num,
        executive_typ: initState.executive_typ,
        court_date: initState.court_date,
        DELIVERY_TYP: initState.DELIVERY_TYP,
        entry_force_dt: initState.entry_force_dt,
        receipt_recover_dt: initState.receipt_recover_dt,
        template_typ: initState.template_typ,
        fssp_date: initState.fssp_date,
        r_court_id: initState.r_court_id,
        r_court_name: initState.r_court_name,
        start_date: initState.start_date,
        dsc: initState.dsc,
        person_property: initState.person_property,
        appeal_typ: initState.appeal_typ,
        add_interests: initState.add_interests,
        custom_requisites_id: initState.custom_requisites_id,
        court_sum: initState.court_sum,
        exec_number: initState.exec_number,
        debt_payments_sum: initState.debt_payments_sum,
        list_egrul: state.list_egrul,
        rename_notification: state.rename_notification,
      };
    },
  },
});
export const { setData, setSend, reset, setId } = send.actions;
export default send.reducer;
