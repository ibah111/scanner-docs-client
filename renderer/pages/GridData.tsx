import { Box, Grid } from '@mui/material';
import {
  DataGridPremium,
  GridFilterModel,
  GridSortModel,
} from '@mui/x-data-grid-premium';
import React from 'react';
import getDocs from '../api/getDocs';
import { CustomToolbar } from '../components/CustomToolbar';
import { useAppDispatch, useAppSelector } from '../Reducer';
import { setDocs } from '../Reducer/Docs';
import { setComponents } from '../Reducer/DocsComponent';
import { DocColumns } from '../components/Docs/DocColumns';
import CustomPagination from '../components/Pagination/CustomPagination';
import PrevTransmit from '../components/Docs/Transmit/PrevTransmit';
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

  React.useEffect(() => {
    if (page || pageSize || filterModel || sortModel) {
      getDocs({
        filterModel,
        sortModel,
        paginationModel: { page, pageSize },
      }).then((res) => {
        dispatch(setDocs(res));
      });
    }
  }, [page, pageSize, filterModel, sortModel, dispatch]);
  return (
    <>
      <Grid item xs sx={{ height: '100%', width: '100vw' }}>
        <DataGridPremium
          sx={{ pl: 2 }}
          columns={DocColumns}
          rows={data.rows}
          pagination
          rowCount={data.count}
          onFilterModelChange={onFilterChange}
          filterModel={filterModel}
          sortModel={sortModel}
          paginationMode="server"
          filterMode="server"
          sortingMode="server"
          onSortModelChange={handleSortModelChange}
          getDetailPanelContent={({ row }) => (
            <Box>
              <PrevTransmit key={row.id} id={row.id} />
            </Box>
          )}
          getDetailPanelHeight={() => 'auto'}
          slots={{
            toolbar: CustomToolbar,
            pagination: CustomPagination,
          }}
        />
      </Grid>
    </>
  );
}
