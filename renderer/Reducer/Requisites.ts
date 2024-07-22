import { Draft, PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IsNotEmpty } from '../hooks/Validation/locale';
import { IsInn } from '../hooks/Validation/isInn';

export class BankRequisitesInstance {
  /**
   * Наименование
   */
  @IsNotEmpty()
  name: string;
  /**
   * Получатель
   */
  @IsNotEmpty()
  recipient: string;
  /**
   * Банк получателя
   */
  @IsNotEmpty()
  br_name: string;
  /**
   * ИНН
   */
  @IsInn()
  @IsNotEmpty()
  inn: string;
  /**
   * КПП
   */
  @IsNotEmpty()
  kpp: string;
  /**
   * Рассчётный счёт
   */
  @IsNotEmpty()
  r_account: string;
  /**
   * БИК
   */
  @IsNotEmpty()
  bik: string;
  /**
   * Корр счёт
   */
  @IsNotEmpty()
  k_account: string;
  /**
   * Назначение платежа
   */
  pay_purpose: string;
  /**
   * Юр адресс
   */
  br_address: string;
  /**
   * Тип реквизита
   */
  typ: number;
  /**
   * Неизвестно (КБЕ)
   */
  kbe: string;
  /**
   * Неизвестно (КНП)
   */
  knp: string;
  /**
   * Неизвестно (КОД)
   */
  kod: string;
}
type ValueOf<T> = T[keyof T];
export type RequisitesTypes = ValueOf<BankRequisitesInstance>;
export type RequisitesNames = keyof BankRequisitesInstance;
export const initState: BankRequisitesInstance = {
  name: '',
  recipient: '',
  bik: '',
  br_address: '',
  br_name: '',
  inn: '',
  k_account: '',
  kbe: '',
  knp: '',
  kod: '',
  kpp: '',
  pay_purpose: '',
  r_account: '',
  typ: 1,
};
export const requisitesSlice = createSlice({
  name: 'BankRequisites',
  initialState: { ...initState },
  reducers: {
    setRequisitesState<K extends RequisitesNames>(
      state: Draft<BankRequisitesInstance>,
      action: PayloadAction<[K, BankRequisitesInstance[K]]>,
    ) {
      state[action.payload[0]] = action.payload[1];
    },
    resetRequisitesState: () => {
      return initState;
    },
  },
});
export const { setRequisitesState, resetRequisitesState } =
  requisitesSlice.actions;
export default requisitesSlice.reducer;
