import React from 'react';
import useColumns from './AdminColumns';
import getRoles, { User } from '../../api/getRoles';

export default function useAdminPageGrid() {
  const columns = useColumns();
  const [rows, setRows] = React.useState<User[]>([]);
  const [rowCount, setRowCount] = React.useState<number>();
  const refresh = React.useCallback(() => {
    getRoles().then((res) => {
      setRows(res.rows);
      setRowCount(res.count);
    });
  }, []);

  React.useEffect(() => {
    refresh();
  }, [refresh]);
  return {
    rows,
    columns,
    rowCount,
  };
}
