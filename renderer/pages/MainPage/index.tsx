import { Box, Grid } from "@mui/material";
import { DataGridPremium } from "@mui/x-data-grid-premium";
import React from "react";
import { useAppSelector } from "../../Reducer";
import Scan from "../../components/Scan";
import columns from "../../components/MainPage/columns";
import SendingForm from "../../components/MainPage/SendingForm";

export default function Main() {
  const data = useAppSelector((state) => state.Data);
  const User = useAppSelector((state) => state.User);
  const rows = data ? [data] : [];
  return (
    <Box>
      <Grid
        container
        direction="column"
        alignItems="center"
        spacing={4}
        height="100%"
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
          {User.roles.includes("sender") && rows.length > 0 && <SendingForm />}
        </Grid>
        <Grid item>
          <Scan />
        </Grid>
      </Grid>
    </Box>
  );
}
