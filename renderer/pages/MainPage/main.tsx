import { Box, Button, Grid, Link } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { plainToInstance } from "class-transformer";
import React from "react";
import { useAppSelector } from "../../Reducer";
import { Barcode } from "../../Schemas/Barcode.model";
import Scan from "../Scan";
import columns from "./columns";
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
          <DataGrid
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
