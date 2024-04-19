import { t } from 'i18next';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../Reducer';
import callError from './callError';
import checkDate from './checkDate';
import checkNull from './checkNull';
import checkNumber from './checkNumber';
import checkString from './checkString';
import { DateTime } from 'luxon';
import { DataNames, DataTypes, setData } from '../Reducer/Send';
type Typed = 'string' | 'date' | 'null' | 'number' | 'boolean' | null;
export default function useError<K extends DataNames>(
  name: K,
  type: Typed = null,
  availableEmpty = false,
  availableZero = false,
) {
  const dispatch = useAppDispatch();
  const ErrorValue = useAppSelector((state) => state.Error[name]);
  const SendValue = useAppSelector((state) => state.Send[name]);
  const value: DataTypes[K] = React.useMemo(() => {
    switch (type) {
      case 'string':
        return (SendValue || '') as DataTypes[K];
      case 'number':
        return (SendValue === null ? '' : SendValue) as DataTypes[K];
      case 'date':
        if (!DateTime.isDateTime(SendValue) && SendValue)
          return DateTime.fromISO(SendValue as string) as DataTypes[K];
        break;
    }
    return SendValue as DataTypes[K];
  }, [SendValue, type]);
  const setValue = React.useCallback(
    (newValue: DataTypes[K]) => {
      switch (type) {
        case 'date': {
          dispatch(setData([name, (newValue as DateTime).startOf('day')]));
          break;
        }
        default:
          dispatch(setData([name, newValue]));
          break;
      }
    },
    [dispatch, name, type],
  );
  React.useEffect(() => {
    let error;
    switch (type) {
      case 'string':
        error = checkString(value, availableEmpty);
        break;
      case 'date':
        error = checkDate(value, availableEmpty);
        break;
      case 'number':
        error = checkNumber(value, availableEmpty, availableZero);
        console.log(name, value, error);
        break;
      case 'null':
        error = checkNull(value);
        break;
    }
    callError(name, error);
  }, [name, value, availableEmpty, type, availableZero]);
  return {
    setValue,
    value,
    error_text: ErrorValue && t(`form.errors.${ErrorValue}`),
    isInvalid: Boolean(ErrorValue),
    isValid: !ErrorValue,
  };
}
