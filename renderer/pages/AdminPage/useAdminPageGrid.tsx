import React from 'react';
import useColumns from './AdminColumns';
import getRoles, { User } from '../../api/getRoles';

export default function useAdminPageGrid() {
  const columns = useColumns();
  const [rows, setRows] = React.useState<User[]>([]);
  const refresh = React.useCallback(() => {
    getRoles().then((res) => {
      setRows(res);
    });
  }, []);

  React.useEffect(() => {
    refresh();
  }, [refresh]);
  return {
    rows,
    columns,
  };
}
