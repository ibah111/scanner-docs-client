import React from 'react';
import useColumns from './AdminColumns';
import getRoles, { User } from '../../api/getRoles';
import {
  GridFilterModel,
  GridPaginationModel,
  GridSortModel,
} from '@mui/x-data-grid';
import getRolesArray from '../../api/Roles/getRolesArray';
import useAsyncMemo from '../../utils/useAsyndMemo';

export default function useAdminPageGrid() {
  const roles = useAsyncMemo(getRolesArray, [], []);
  const columns = useColumns(roles);
  const [loading, setLoading] = React.useState(false);
  const [rows, setRows] = React.useState<User[]>([]);
  const [rowCount, setRowCount] = React.useState<number>(0);
  const [paginationModel, onPaginationModelChange] =
    React.useState<GridPaginationModel>({ page: 0, pageSize: 25 });
  const [sortModel, onSortModelChange] = React.useState<GridSortModel>([]);
  const [filterModel, onFilterModelChange] = React.useState<GridFilterModel>({
    items: [],
  });
  const refresh = React.useCallback(async () => {
    setLoading(true);
    await getRoles({
      filterModel,
      sortModel,
      paginationModel,
    }).then((res) => {
      setRows(res.rows);
      setRowCount(res.count);
      setLoading(false);
    });
  }, [paginationModel, sortModel, filterModel]);

  React.useEffect(() => {
    refresh();
  }, [refresh]);
  return {
    loading,
    rows,
    columns,
    rowCount,
    onPaginationModelChange,
    onSortModelChange,
    onFilterModelChange,
    paginationModel,
    sortModel,
    filterModel,
  };
}
