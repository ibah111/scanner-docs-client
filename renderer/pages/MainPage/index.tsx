import { Box, Button, Grid, Link } from "@mui/material";
import { DataGridPremium } from "@mui/x-data-grid-premium";
import React from "react";
import { useAppSelector } from "../../Reducer";
import Scan from "../../components/Scan";
import columns from "./columns";
import OpenDoc from "./Components/openDoc";
import SendingForm from "./Components/sendingForm";

export default function Main() {
  const data = useAppSelector((state) => state.Data);
  console.log(data);
  const rows = data ? [data] : [];
  return (
    <Box>
      <Grid container direction="column" alignItems="center" spacing={7}>
        <Grid
          item
          container
          direction="row"
          justifyContent="space-around"
          alignItems="center"
        >
          <DataGridPremium
            autoHeight={Boolean(data)}
            columns={columns}
            rows={rows}
            hideFooter
          />
        </Grid>
        <Grid item>{rows.length > 0 && <SendingForm />}</Grid>
        <Grid item>
          <Scan />
        </Grid>
        <Grid item>
          <Button component={Link} href="/home">
            {" "}
            Вернуться
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
