import { Box, Grid } from '@mui/material';
import PrevTransmit from '../../components/Docs/Transmit/PrevTransmit';
import useDocumentPage from './useDocumentPage';
import { DataGridPremium } from '@mui/x-data-grid-premium';
import CustomPagination from '../../components/Pagination/CustomPagination';
import DocumentToolbar from './DocumentToolbar/DocumentToolbar';
import React from 'react';
import DocumentCreateDialog from './DocumentCreateDialog/DocumentCreateDialog';
import PrindDialog from './DocumentComponents/PrintDialog';
import usePrintControl from './DocumentComponents/usePrintControl';
export enum DocumentEvents {
  openPrintDialog = 'openPrintDialog',
}
export class EventDocumentDialog<
  Value = number | string | object,
> extends Event {
  constructor(type: DocumentEvents, value: Value, title?: string) {
    super(type);
    this.value = value;
    this.title = title;
  }
  value: Value;
  title?: string;
}
export default function DocumentPage() {
  const EventTrigger = React.useMemo(() => new EventTarget(), []);
  const { ...gridProps } = useDocumentPage(EventTrigger);

  const [open, setOpen] = React.useState(false);
  const handleOpenDocumentCreate = () => {
    setOpen(true);
  };
  const handleCloseDocumentCreate = () => {
    setOpen(false);
  };
  const printControl = usePrintControl({
    EventTarget: EventTrigger,
    refresh: () => {},
  });
  return (
    <>
      <Grid
        item
        xs
        container
        direction={'column'}
        justifyContent={'flex-start'}
        alignItems={'center'}
        sx={{ minHeight: 0, minWidth: 0 }}
      >
        <DataGridPremium
          sx={{
            width: '100%',
          }}
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
            toolbar: { handleOpenDocumentCreate },
          }}
        />
        {open && (
          <DocumentCreateDialog
            open={open}
            onClose={handleCloseDocumentCreate}
          />
        )}
        {printControl.open && (
          <PrindDialog
            docCode={printControl.docCode}
            docId={printControl.docId}
            open={printControl.open}
            onClose={printControl.closePrintDialog}
            titleCode={printControl.titleCode}
          />
        )}
      </Grid>
    </>
  );
}
