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
        sx={{ width: '100%', height: 520 }}
        container
        direction={'column'}
      >
        <DataGridPremium
          {...gridProps}
          sx={{ pl: 2 }}
          pagination
          slots={{
            toolbar: CustomToolbar,
            pagination: CustomPagination,
          }}
        />
      </Grid>
    </>
  );
}
