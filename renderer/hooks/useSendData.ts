import React from 'react';
import { useAppDispatch, useAppSelector } from '../Reducer';
import checker from './Validation/checker';
import { ResultData } from './Validation/ResultData';
import { SendDocInstance, setSendDocProperty } from '../Reducer/SendDoc';

export default function useSendData<T extends keyof SendDocInstance>(
  name: T,
  additional?: Partial<SendDocInstance>,
): ResultData<SendDocInstance, T> {
  const dispatch = useAppDispatch();
  const value = useAppSelector((state) =>
    state.SendDoc?.[name] === undefined || state.SendDoc?.[name] === null
      ? ''
      : state.SendDoc?.[name],
  );

  const setValue = React.useCallback(
    (value: SendDocInstance[T] | null | undefined) => {
      if (value === undefined || value == null) {
        dispatch(setSendDocProperty([name, undefined]));
      } else {
        dispatch(setSendDocProperty([name, value]));
      }
    },
    [dispatch, name],
  );

  React.useEffect(() => {
    if (value === '') {
      dispatch(setSendDocProperty([name, undefined]));
    }
  }, [dispatch, name, value]);

  const { required, error, helperText } = React.useMemo(
    () => checker(SendDocInstance, name, value, additional),
    [name, value, additional],
  );
  return { value, onChange: setValue, required, error, helperText };
}
