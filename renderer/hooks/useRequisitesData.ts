import React from 'react';
import { useAppDispatch, useAppSelector } from '../Reducer';
import {
  BankRequisitesInstance,
  setRequisitesState,
} from '../Reducer/Requisites';
import checker from './Validation/checker';

export default function useRequisitesData<
  T extends keyof BankRequisitesInstance,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
>(name: T, additional: Partial<BankRequisitesInstance>) {
  const dispatch = useAppDispatch();
  const value = useAppSelector((state) =>
    state.Requisites?.[name] === null ? '' : state.Requisites?.[name],
  );

  const setValue = React.useCallback(
    (value: BankRequisitesInstance[T] | null | undefined) => {
      if (value === undefined || value === null) {
        dispatch(setRequisitesState([name, '']));
      } else {
        dispatch(setRequisitesState([name, value]));
      }
    },
    [dispatch, name],
  );
  React.useEffect(() => {
    if (value === '') {
      dispatch(setRequisitesState([name, '']));
    }
  }, [dispatch, name, value]);

  const { required, error, helperText } = React.useMemo(
    () => checker(BankRequisitesInstance, name, value),
    [name, value],
  );
  return {
    value,
    onChange: setValue,
    required,
    error,
    helperText,
  };
}
