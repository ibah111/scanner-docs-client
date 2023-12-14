import { Grid, Tooltip } from '@mui/material';
import { GridActionsCellItem } from '@mui/x-data-grid-premium';
import PrintIcon from '@mui/icons-material/Print';
interface PrintButtonInterface {
  handleOpen: VoidFunction;
}
export default function PrintButton({ handleOpen }: PrintButtonInterface) {
  return (
    <Grid>
      <Tooltip title="Печать">
        <GridActionsCellItem
          onClick={() => handleOpen()}
          icon={<PrintIcon />}
          label="PrintButton"
        />
      </Tooltip>
    </Grid>
  );
}
