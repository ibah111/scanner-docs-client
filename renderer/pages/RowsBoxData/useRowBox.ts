import {
  GridPaginationModel,
  GridSortModel,
  GridFilterModel,
} from '@mui/x-data-grid-premium';
import React from 'react';
import { Doc } from '../../Schemas/Doc.model';
import rowBoxColumns from './rowBoxColumns';
import openRowsBox from '../../api/openRowsBox';

export default function useRowBox() {
  const columns = rowBoxColumns();
  const [rows, setRows] = React.useState<Doc[]>([]);
  const [rowCount, setRowCount] = React.useState<number>(0);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [paginationModel, onPaginationModelChange] =
    React.useState<GridPaginationModel>({ page: 0, pageSize: 25 });
  const [sortModel, onSortModelChange] = React.useState<GridSortModel>([]);
  const [filterModel, onFilterModelChange] = React.useState<GridFilterModel>({
    items: [],
  });

  const refresh = React.useCallback(() => {
    setLoading(true);
    openRowsBox().then((res) => {
      setRows(res.rows);
      setRowCount(res.count);
      setLoading(false);
    });
  }, [filterModel, paginationModel, sortModel]);
  React.useEffect(() => {
    return refresh();
  }, [refresh]);
  return {
    refresh,
    columns,
    rows,
    rowCount,
    loading,
    onPaginationModelChange,
    onSortModelChange,
    onFilterModelChange,
  };
}
