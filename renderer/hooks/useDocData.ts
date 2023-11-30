import React from 'react';
import { useAppDispatch, useAppSelector } from '../Reducer';
import checker from './Validation/checker';
import { ResultData } from './Validation/ResultData';
import { DocInstance, setPropertyValue } from '../Reducer/Doc';

export default function useAgreementData<T extends keyof DocInstance>(
  name: T,
  additional?: Partial<DocInstance>,
): ResultData<DocInstance, T> {
  const dispatch = useAppDispatch();
  const value = useAppSelector((state) =>
    state.Doc?.[name] === undefined || state.Doc?.[name] === null
      ? ''
      : state.Doc?.[name],
  );

  const setValue = React.useCallback(
    (value: DocInstance[T] | null | undefined) => {
      if (value === undefined || value == null) {
        dispatch(setPropertyValue([name, undefined]));
      } else {
        dispatch(setPropertyValue([name, value]));
      }
    },
    [dispatch, name],
  );

  React.useEffect(() => {
    if (value === '') {
      dispatch(setPropertyValue([name, undefined]));
    }
  }, [dispatch, name, value]);

  const { required, error, helperText } = React.useMemo(
    () => checker(DocInstance, name, value, additional),
    [name, value, additional],
  );
  return { value, onChange: setValue, required, error, helperText };
}
