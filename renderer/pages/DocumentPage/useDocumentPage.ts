import React from 'react';
import documentColumns from './documentColumns';
import { Doc } from '../../Schemas/Doc.model';
import getDocs from '../../api/getDocs';
import {
  GridFilterModel,
  GridPaginationModel,
  GridSortModel,
} from '@mui/x-data-grid-premium';
import { GridInitialStatePremium } from '@mui/x-data-grid-premium/models/gridStatePremium';
import getAllBoxTypes from '../../api/Box/getAllBoxTypes';
import { BoxTypes } from '../../Schemas/BoxTypes.model';

export default function useDocumentPage(EventTarget: EventTarget) {
  const [rows, setRows] = React.useState<Doc[]>([]);
  const [rowCount, setRowCount] = React.useState<number>(0);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [paginationModel, onPaginationModelChange] =
    React.useState<GridPaginationModel>({ page: 0, pageSize: 25 });
  const [sortModel, onSortModelChange] = React.useState<GridSortModel>([]);
  const [filterModel, onFilterModelChange] = React.useState<GridFilterModel>({
    items: [],
  });
  const [boxTypes, setBoxTypes] = React.useState<BoxTypes[]>([]);
  const refresh = React.useCallback(() => {
    setLoading(true);
    getDocs({
      filterModel,
      paginationModel,
      sortModel,
    }).then((res) => {
      setRows(res.rows), setRowCount(res.count), setLoading(false);
    });
    getAllBoxTypes().subscribe({
      next(value) {
        setBoxTypes(value);
      },
    });
  }, [filterModel, sortModel, paginationModel]);

  const columns = documentColumns(
    {
      EventTarget,
      refresh,
    },
    boxTypes,
  );
  const initialState: GridInitialStatePremium = {
    pinnedColumns: {
      left: [],
      right: ['actions'],
    },
  };

  React.useEffect(() => {
    refresh();
  }, [refresh]);
  return {
    rows,
    columns,
    loading,
    rowCount,
    paginationModel,
    onPaginationModelChange,
    sortModel,
    onSortModelChange,
    filterModel,
    onFilterModelChange,
    initialState,
  };
}
