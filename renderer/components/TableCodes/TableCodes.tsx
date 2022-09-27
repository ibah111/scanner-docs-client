import { Button, Grid } from '@mui/material';
import {
  DataGridPremium,
  GridFilterModel,
  GridSortModel,
} from '@mui/x-data-grid-premium';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../Reducer';
import { setRowsBox } from '../../Reducer/RowsBox';
import columns from './columns';
import openRowsBox from '../../api/openRowsBox';
import createCode from '../../api/createCode';
import { setBox } from '../../Reducer/Box';
import { socketConnect } from '../../lib/socket';
import { addDoc, setDocs } from '../../Reducer/Docs';
import { setRowDoc } from '../../Reducer/RowDoc';

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
  const handlePageChange = (newPage: number) => {
    dispatch(setRowsBox(['page', newPage]));
  };

  const handlePageSizeChange = (newPageSize: number) => {
    dispatch(setRowsBox(['pageSize', newPageSize]));
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
        console.log(res);
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
        height="100%"
        width="100%"
      >
        <Grid
          item
          xs
          container
          direction="row"
          justifyContent="space-around"
          alignItems="center"
          height="100%"
          width="100%"
        >
          <DataGridPremium
            sx={{ pl: 3, pr: 3, pt: 2, height: '100%' }}
            columns={columns}
            rows={data.rows}
            paginationMode="server"
            pagination
            page={page}
            onPageChange={handlePageChange}
            rowCount={data.count}
            filterMode="server"
            onFilterModelChange={onFilterChange}
            filterModel={filterModel}
            sortModel={sortModel}
            sortingMode="server"
            onSortModelChange={handleSortModelChange}
            pageSize={pageSize}
            onPageSizeChange={handlePageSizeChange}
          />
        </Grid>
      </Grid>

      {data.rows.length > 0 && (
        <Button
          onClick={() => {
            dispatch(setBox(['create', true]));
            createCode();
          }}
          color="primary"
          variant="contained"
          sx={{ ml: '86vw', mt: '10px' }}
        >
          Создать короб
        </Button>
      )}
    </>
  );
}
