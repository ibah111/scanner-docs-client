import React from 'react';
import documentColumns from './documentColumns';
import { Doc } from '../../Schemas/Doc.model';
import getDocs from '../../api/getDocs';
import {
  GridFilterModel,
  GridPaginationModel,
  GridSortModel,
} from '@mui/x-data-grid-premium';

export default function useDocumentPage() {
  const columns = documentColumns();
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
    getDocs()
      .then((res) => {
        setRows(res.rows), setRowCount(res.count);
      })
      /** absurd */
      .then(() => setLoading(false));
  }, []);
  React.useEffect(() => {
    refresh();
  }, []);
  return {
    rows,
    columns,
    loading,
    rowCount,
    /**
     * Модель фильтров, сорт, пагинации
     */
    paginationModel,
    onPaginationModelChange,
    sortModel,
    onSortModelChange,
    filterModel,
    onFilterModelChange,
  };
}
