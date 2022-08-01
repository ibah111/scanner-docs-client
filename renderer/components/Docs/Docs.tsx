import { Box, Button, Grid } from "@mui/material";
import { DataGridPremium } from "@mui/x-data-grid-premium";
import React from "react";
import { useAppSelector } from "../../Reducer";
import columns from "./columns";

export default function Docs() {
  const data = useAppSelector((state) => state.Docs);
  const rows = data ? data : [];
  return (
    <>
      <Box>
        <Grid container direction="column" alignItems="center" height="100%">
          <Grid
            item
            container
            direction="row"
            justifyContent="space-around"
            alignItems="center"
            height="100%"
          >
            (
            <DataGridPremium
              autoHeight
              columns={columns}
              rows={rows}
              hideFooter
            />
            )
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
