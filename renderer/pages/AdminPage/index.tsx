import { Grid } from '@mui/material';
import { DataGridPremium } from '@mui/x-data-grid-premium';
import useAdminPageGrid from './useAdminPageGrid';
import { CustomToolbar } from '../../components/CustomToolbar';
import CustomPagination from '../../components/Pagination/CustomPagination';

export default function AmdinPage() {
  const { ...gridProps } = useAdminPageGrid();
  return (
    <>
      <Grid
        item
        xs
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        sx={{ minHeight: 0, minWidth: 0 }}
      >
        <DataGridPremium
          pagination
          sx={{ width: '100%' }}
          paginationMode="server"
          filterMode="server"
          sortingMode="server"
          slots={{
            toolbar: CustomToolbar,
            pagination: CustomPagination,
          }}
          {...gridProps}
        />
      </Grid>
    </>
  );
}
