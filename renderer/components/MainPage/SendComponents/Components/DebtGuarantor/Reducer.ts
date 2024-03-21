import { Address, DebtGuarantor } from '@contact/models';
import {
  configureStore,
  createSlice,
  Draft,
  PayloadAction,
} from '@reduxjs/toolkit';
import { CreationAttributes } from '@sql-tools/sequelize';
import React from 'react';
import {
  createDispatchHook,
  createSelectorHook,
  ReactReduxContextValue,
  TypedUseSelectorHook,
} from 'react-redux';
export type TypeDebtGuarantor = CreationAttributes<DebtGuarantor>;
const initialStateDg = {} as TypeDebtGuarantor;
const DebtGuarantorSlice = createSlice({
  name: 'DebtGuarantor',
  initialState: initialStateDg,
  reducers: {
    setDebtGuarantor: (state, action: PayloadAction<DebtGuarantor>) =>
      action.payload,
    setDebtGuarantorValue<T extends keyof TypeDebtGuarantor>(
      state: Draft<TypeDebtGuarantor>,
      action: PayloadAction<[T, TypeDebtGuarantor[T]]>,
    ) {
      state[action.payload[0]] = action.payload[1];
      return state;
    },
    resetDebtGuarantor() {
      return initialStateDg;
    },
  },
});
export type TypeDebtGuarantorAddress = CreationAttributes<Address>;
const initialStateDgAddress = {} as TypeDebtGuarantorAddress;
const DebtGuarantorAddressSlice = createSlice({
  name: 'Address',
  initialState: initialStateDgAddress,
  reducers: {
    setDebtGuarantorAddress: (state, action: PayloadAction<Address>) =>
      action.payload,
    setDebtGuarantorAddressValue<T extends keyof TypeDebtGuarantorAddress>(
      state: Draft<TypeDebtGuarantorAddress>,
      action: PayloadAction<[T, TypeDebtGuarantorAddress[T]]>,
    ) {
      state[action.payload[0]] = action.payload[1];
      return state;
    },
    resetDebtGuarantorAddress() {
      return initialStateDgAddress;
    },
  },
});
export const { setDebtGuarantor, setDebtGuarantorValue, resetDebtGuarantor } =
  DebtGuarantorSlice.actions;
export const {
  setDebtGuarantorAddress,
  setDebtGuarantorAddressValue,
  resetDebtGuarantorAddress,
} = DebtGuarantorAddressSlice.actions;
const store = configureStore({
  reducer: {
    DebtGuarantor: DebtGuarantorSlice.reducer,
    Address: DebtGuarantorAddressSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
export type DgState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const DgReducerContext = React.createContext(
  null as unknown as ReactReduxContextValue,
);
export const useDgDispatch: () => AppDispatch =
  createDispatchHook(DgReducerContext);

export const useDgSelector: TypedUseSelectorHook<DgState> =
  createSelectorHook(DgReducerContext);
export default store;
