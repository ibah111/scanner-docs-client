import { Button, Grid } from '@mui/material';
import {
  DataGridPremium,
  GridFilterModel,
  GridSortModel,
} from '@mui/x-data-grid-premium';
import React from 'react';
import createCode from '../api/createCode';
import openRowsBox from '../api/openRowsBox';
import { CustomToolbar } from '../components/CustomToolbar';
import columns from '../components/TableCodes/columns';
import { socketConnect } from '../lib/socket';
import { useAppDispatch, useAppSelector } from '../Reducer';
import { setBox } from '../Reducer/Box';
import { setRowDoc } from '../Reducer/RowDoc';
import { setRowsBox } from '../Reducer/RowsBox';
import CustomPagination from '../components/Pagination/CustomPagination';
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
            toolbar: CustomToolbar,
            pagination: CustomPagination,
          }}
          slotProps={{
            toolbar: {},
          }}
        />
      </Grid>

      {data.rows.length > 0 && (
        <Button
          onClick={() => {
            dispatch(setBox(['create', true]));
            createCode();
          }}
          color="primary"
          variant="contained"
          sx={{ ml: '88vw', mt: '10px', mb: '10px' }}
        >
          Создать короб
        </Button>
      )}
    </>
  );
}
