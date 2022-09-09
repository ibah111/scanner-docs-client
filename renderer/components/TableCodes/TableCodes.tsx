import { Box, Button, Grid } from '@mui/material';
import {
  DataGridPremium,
  GridFilterModel,
  GridSortModel,
} from '@mui/x-data-grid-premium';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../Reducer';
import { setDocs } from '../../Reducer/Docs';
import { setRowsBox } from '../../Reducer/RowsBox';
import columns from './columns';
import openRowsBox from '../../api/openRowsBox';
import createCode from '../../api/createCode';
import { setBox } from '../../Reducer/Box';

export default function TableCodes() {
  const data = useAppSelector((state) => state.Docs);
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
        dispatch(setDocs(res));
      });
    }
  }, [page, pageSize, filterModel, sortModel]);
  return (
    <>
      <Box>
        <Grid
          container
          direction="column"
          alignItems="center"
          height="100%"
          width="100%"
        >
          <Grid
            item
            container
            direction="row"
            justifyContent="space-around"
            alignItems="center"
            height="100%"
            width="100%"
          >
            <DataGridPremium
              sx={{ pl: 3, pr: 3, pt: 2 }}
              autoHeight
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
        <Button
          onClick={() => {
            dispatch(setBox(['create', true]));
            createCode();
          }}
          color="primary"
          variant="contained"
          sx={{ float: 'right', mr: '13px' }}
        >
          Создать короб
        </Button>
      </Box>
    </>
  );
}
