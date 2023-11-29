import { Box, Grid } from '@mui/material';
import PrevTransmit from '../../components/Docs/PrevTransmit';
import useDocumentPage from './useDocumentPage';
import { DataGridPremium } from '@mui/x-data-grid-premium';
import CustomPagination from '../../components/Pagination/CustomPagination';
import { DocumentToolbar } from './DocumentToolbar/DocumentToolbar';

export default function DocumentPage() {
  const { ...gridProps } = useDocumentPage();
  return (
    <>
      <Grid item xs sx={{ height: '100%', width: '100vw' }}>
        <DataGridPremium
          {...gridProps}
          getDetailPanelContent={({ row }) => (
            <Box>
              <PrevTransmit key={row.id} id={row.id} />
            </Box>
          )}
          slots={{
            toolbar: DocumentToolbar,
            pagination: CustomPagination,
          }}
        />
      </Grid>
    </>
  );
}
