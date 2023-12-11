import { Grid } from '@mui/material';
import { DataGridPremium } from '@mui/x-data-grid-premium';
import React from 'react';
import openRowsBox from '../../api/openRowsBox';
import { socketConnect } from '../../lib/socket';
import { useAppDispatch } from '../../Reducer';
import { setRowDoc } from '../../Reducer/RowDoc';
import { RowBoxToolbar } from './RowBoxToolbar';
import CustomPagination from '../../components/Pagination/CustomPagination';
import useRowBox from './useRowBox';
export default function TableCodes() {
  const dispatch = useAppDispatch();
  const { refresh, ...gridProps } = useRowBox();
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
      <Grid
        item
        xs
        container
        direction="column"
        alignItems="center"
        sx={{
          minWidth: 0,
          minHeight: 0,
        }}
      >
        <DataGridPremium
          {...gridProps}
          sx={{ pl: 2, height: '100%', width: '100%' }}
          filterMode="server"
          sortingMode="server"
          paginationMode="server"
          pagination
          slots={{
            toolbar: RowBoxToolbar,
            pagination: CustomPagination,
          }}
          slotProps={{
            toolbar: { refresh },
          }}
          checkboxSelection
        />
      </Grid>
    </>
  );
}
