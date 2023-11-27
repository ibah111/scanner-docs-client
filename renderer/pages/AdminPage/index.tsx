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
        sx={{ width: '100%', height: 520 }}
      >
        <DataGridPremium
          {...gridProps}
          sx={{ pl: 2 }}
          /** */
          pagination
          paginationMode="server"
          filterMode="server"
          sortingMode="server"
          slots={{
            toolbar: CustomToolbar,
            pagination: CustomPagination,
          }}
        />
      </Grid>
    </>
  );
}
