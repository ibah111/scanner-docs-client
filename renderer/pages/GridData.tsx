import { Box, Grid } from '@mui/material';
import {
  DataGridPremium,
  GridFilterModel,
  GridSortModel,
} from '@mui/x-data-grid-premium';
import React from 'react';
import getDocs from '../api/getDocs';
import { CustomToolbar } from '../components/CustomToolbar';
import columns from '../components/Docs/columns';
import PrevTransmit from '../components/Docs/PrevTransmit';
import { useAppDispatch, useAppSelector } from '../Reducer';
import { setDocs } from '../Reducer/Docs';
import { setComponents } from '../Reducer/DocsComponent';

export default function Docs() {
  const data = useAppSelector((state) => state.Docs);
  const { filterModel, page, pageSize, sortModel } = useAppSelector(
    (state) => state.DocsComponent,
  );
  const dispatch = useAppDispatch();
  const onFilterChange = (filter: GridFilterModel) => {
    dispatch(setComponents(['filterModel', filter]));
  };
  const handleSortModelChange = (sort: GridSortModel) => {
    dispatch(setComponents(['sortModel', sort]));
  };
  const handlePageChange = (newPage: number) => {
    dispatch(setComponents(['page', newPage]));
  };

  const handlePageSizeChange = (newPageSize: number) => {
    dispatch(setComponents(['pageSize', newPageSize]));
  };

  React.useEffect(() => {
    if (page || pageSize || filterModel || sortModel) {
      getDocs().then((res) => {
        dispatch(setDocs(res));
      });
    }
  }, [page, pageSize, filterModel, sortModel]);
  return (
    <>
      <Grid item xs sx={{ height: '100%', width: '100vw' }}>
        <DataGridPremium
          sx={{ pl: 2 }}
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
          rowThreshold={0}
          getDetailPanelContent={({ row }) => (
            <Box>
              <PrevTransmit id={row.id} />
            </Box>
          )}
          getDetailPanelHeight={() => 'auto'}
          components={{
            Toolbar: CustomToolbar,
          }}
        />
      </Grid>
    </>
  );
}
