import { Box, Grid } from '@mui/material';
import PrevTransmit from '../../components/Docs/PrevTransmit';
import useDocumentPage from './useDocumentPage';
import { DataGridPremium } from '@mui/x-data-grid-premium';
import CustomPagination from '../../components/Pagination/CustomPagination';
import { DocumentToolbar } from './DocumentToolbar/DocumentToolbar';
import React from 'react';
import DocumentCreateDialog from './DocumentCreateDialog/DocumentCreateDialog';
enum DocumentEvents {
  openCreateWindow = 'openCreateWindow',
}
export class EventDialog<Value = number | string | object> extends Event {
  constructor(type: DocumentEvents, value: Value) {
    super(type);
    this.value = value;
  }
  value: Value;
}
export default function DocumentPage() {
  const { ...gridProps } = useDocumentPage();
  const DialogTarget = React.useMemo(() => new EventTarget(), []);
  console.log(DialogTarget);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Grid item xs sx={{ height: '100%', width: '100vw' }}>
        <DataGridPremium
          {...gridProps}
          pagination
          paginationMode="server"
          filterMode="server"
          sortingMode="server"
          getDetailPanelContent={({ row }) => (
            <Box>
              <PrevTransmit key={row.id} id={row.id} />
            </Box>
          )}
          slots={{
            toolbar: DocumentToolbar,
            pagination: CustomPagination,
          }}
          slotProps={{
            toolbar: { handleOpen },
          }}
        />
        {open && <DocumentCreateDialog open={open} onClose={handleClose} />}
      </Grid>
    </>
  );
}
