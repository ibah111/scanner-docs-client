import { Grid } from '@mui/material';
import {
  DataGridPremium,
  GridFilterModel,
  GridSortModel,
} from '@mui/x-data-grid-premium';
import React from 'react';
import openRowsBox from '../../api/openRowsBox';
import columns from '../../components/TableCodes/columns';
import { socketConnect } from '../../lib/socket';
import { useAppDispatch, useAppSelector } from '../../Reducer';
import { setRowDoc } from '../../Reducer/RowDoc';
import { setRowsBox } from '../../Reducer/RowsBox';
import { RowBoxToolbar } from './RowBoxToolbar';
import CustomPagination from '../../components/Pagination/CustomPagination';
export default function TableCodes() {
  const data = useAppSelector((state) => state.RowDoc);
  const { filterModel, page, pageSize, sortModel } = useAppSelector(
    (state) => state.RowsBox,
  );
  const dispatch = useAppDispatch();
  const onFilterChange = (filter: GridFilterModel) => {
    dispatch(setRowsBox(['filterModel', filter]));
  };
  const handleSortModelChange = (sort: GridSortModel) => {
    dispatch(setRowsBox(['sortModel', sort]));
  };
  React.useEffect(() => {
    if (page || pageSize || filterModel || sortModel) {
      openRowsBox().then((res) => {
        dispatch(setRowDoc(res));
      });
    }
  }, [page, pageSize, filterModel, sortModel]);

  React.useEffect(() => {
    const socket = socketConnect('listen-box');
    socket.on('connect', () => {
      socket.emit('listen-box');
    });
    socket.on('add-item', () => {
      openRowsBox().then((res) => {
        dispatch(setRowDoc(res));
      });
    });
  }, []);
  return (
    <>
      <Grid item xs container direction="column" alignItems="center">
        <DataGridPremium
          sx={{ pl: 2, height: '100%', width: '100%' }}
          columns={columns}
          rows={data.rows}
          rowCount={data.count}
          /**
           * filter
           */
          filterMode="server"
          onFilterModelChange={onFilterChange}
          filterModel={filterModel}
          /**
           * sort
           */
          sortModel={sortModel}
          sortingMode="server"
          onSortModelChange={handleSortModelChange}
          /**
           * pagination
           */
          paginationMode="server"
          pagination
          /**
           * slots
           */
          slots={{
            toolbar: RowBoxToolbar,
            pagination: CustomPagination,
          }}
          slotProps={{
            toolbar: {},
          }}
          checkboxSelection
        />
      </Grid>
    </>
  );
}
