import { Box, Grid } from '@mui/material';
import { DataGridPremium } from '@mui/x-data-grid-premium';
import React from 'react';
import { useAppSelector } from '../../Reducer';
import Scan from '../../components/Scan';
import SendingForm from '../../components/MainPage/sendingForm';
import columnsDoc from '../../components/MainPage/columnsDoc';
import columnsBarcode from '../../components/MainPage/columnsBarcode';

export default function Main() {
  const data = useAppSelector((state) => state.Data);
  const User = useAppSelector((state) => state.User);
  const [rows, setRows] = React.useState([]);
  const [columns, setColumns] = React.useState([]);
  React.useEffect(() => {
    if (!Array.isArray(data) && data != null) {
      setRows([data]);
      setColumns(columnsBarcode);
    } else if (Array.isArray(data)) {
      setRows(data);
      setColumns(columnsDoc);
    }
  }, [data]);
  return (
    <Grid item xs sx={{ flexGrow: 1, width: '100vw' }}>
      <Box>
        <Grid
          container
          direction="column"
          alignItems="center"
          height="100%"
          spacing={3}
        >
          <Grid
            item
            container
            direction="row"
            justifyContent="space-around"
            alignItems="center"
            height="100%"
          >
            {rows.length > 0 && (
              <DataGridPremium
                autoHeight
                columns={columns}
                rows={rows}
                hideFooter
              />
            )}
          </Grid>
          <Grid item>
            {User.roles.includes('sender') && rows.length == 1 && (
              <SendingForm />
            )}
          </Grid>
          <Grid item>
            <Scan />
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
}
