import React from 'react';
import { useAppDispatch, useAppSelector } from '../Reducer';
import checker from './Validation/checker';
import { ResultData } from './Validation/ResultData';
import { SendInstance, setSendProperty } from '../Reducer/Send';

export default function useSendData<T extends keyof SendInstance>(
  name: T,
  additional?: Partial<SendInstance>,
): ResultData<SendInstance, T> {
  const dispatch = useAppDispatch();
  const value = useAppSelector((state) =>
    state.Send?.[name] === undefined || state.Send?.[name] === null
      ? ''
      : state.Send?.[name],
  );

  const setValue = React.useCallback(
    (value: SendInstance[T] | null | undefined) => {
      if (value === undefined || value == null) {
        dispatch(setSendProperty([name, undefined]));
      } else {
        dispatch(setSendProperty([name, value]));
      }
    },
    [dispatch, name],
  );

  React.useEffect(() => {
    if (value === '') {
      dispatch(setSendProperty([name, undefined]));
    }
  }, [dispatch, name, value]);

  const { required, error, helperText } = React.useMemo(
    () => checker(SendInstance, name, value, additional),
    [name, value, additional],
  );
  return { value, onChange: setValue, required, error, helperText };
}
