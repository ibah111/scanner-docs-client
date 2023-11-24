import { Grid } from '@mui/material';
import { DataGridPremium } from '@mui/x-data-grid-premium';
import useAdminPageGrid from './useAdminPageGrid';

export default function AmdinPage() {
  const { ...gridProps } = useAdminPageGrid();
  return (
    <>
      <Grid item xs sx={{ width: '100vw', height: '100%' }}>
        <DataGridPremium {...gridProps} sx={{ pl: 2 }} />
      </Grid>
    </>
  );
}
