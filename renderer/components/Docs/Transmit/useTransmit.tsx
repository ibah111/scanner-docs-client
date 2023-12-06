import React from 'react';
import { Log } from '../../../Schemas/Log.model';
import columnsTransmit from './columnsTransmit';
import openHistory from '../../../api/openHistory';

export default function useTransmit(id: number) {
  const columns = columnsTransmit();
  const [rows, setRows] = React.useState<Log[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const refresh = React.useCallback(() => {
    setLoading(true);
    openHistory(id).then((res) => {
      setRows(res);
      setLoading(false);
    });
  }, []);

  React.useEffect(() => {
    refresh();
  }, []);
  return {
    loading,
    columns,
    rows,
    refresh,
  };
}
