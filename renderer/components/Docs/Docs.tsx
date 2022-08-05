import { Close } from "@mui/icons-material";
import { Box, Button, Grid, IconButton } from "@mui/material";
import { DataGridPremium, GridToolbar } from "@mui/x-data-grid-premium";
import React from "react";
import store from "../../lib/store";
import { useAppDispatch, useAppSelector } from "../../Reducer";
import { resetDocs } from "../../Reducer/Docs";
import columns from "./columns";

export default function Docs() {
  const data = useAppSelector((state) => state.Docs);
  const rows = data ? data : [];
  const [pageSize, setPageSize] = React.useState<number>(25);
  const dispatch = useAppDispatch();
  return (
    <>
      {rows.length > 0 && (
        <Box>
          <IconButton
            onClick={() => {
              store.set("docs", null);
              dispatch(resetDocs());
            }}
            sx={{ float: "right" }}
          >
            <Close />
          </IconButton>
          <Grid container direction="column" alignItems="center" height="100%">
            <Grid
              item
              container
              direction="row"
              justifyContent="space-around"
              alignItems="center"
              height="100%"
              width="100%"
            >
              <DataGridPremium
                autoHeight
                columns={columns}
                rows={rows}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                rowsPerPageOptions={[25, 50, 100]}
                pagination
              />
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
}
