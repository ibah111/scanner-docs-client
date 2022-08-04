import { Box, Grid } from "@mui/material";
import { DataGridPremium, GridToolbar } from "@mui/x-data-grid-premium";
import React from "react";
import { useAppSelector } from "../../Reducer";
import columns from "./columns";

export default function Docs() {
  const data = useAppSelector((state) => state.Docs);
  const rows = data ? data : [];
  const [pageSize, setPageSize] = React.useState<number>(25);
  return (
    <>
      {rows.length > 0 && (
        <Box>
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
                components={{
                  Toolbar: GridToolbar,
                }}
                componentsProps={{
                  toolbar: { showQuickFilter: true },
                }}
              />
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
}
