import React from 'react';
import getDict from '../apiSend/Dict/getDict';
import { useAppDispatch, useAppSelector } from '../Reducer';
import { setDict } from '../Reducer/Dict';

export default function useDict(id: number) {
  const dict = useAppSelector((state) => state.Dict[id]);
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    if (!dict) {
      const data = getDict(id).subscribe((res) => dispatch(setDict(res)));
      return () => {
        data.unsubscribe();
      };
    }
  }, [dict, dispatch, id]);
  return dict || [];
}
