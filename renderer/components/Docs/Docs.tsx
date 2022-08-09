import { Close } from "@mui/icons-material";
import { Box, Button, Grid, IconButton } from "@mui/material";
import { DataGridPremium, GridToolbar } from "@mui/x-data-grid-premium";
import React from "react";
import getDocs from "../../api/getDocs";
import { useAppDispatch, useAppSelector } from "../../Reducer";
import { resetDocs, setDocs } from "../../Reducer/Docs";
import columns from "./columns";

export default function Docs() {
  const data = useAppSelector((state) => state.Docs);
  const [pageSize, setPageSize] = React.useState<number>(25);
  const [page, setPage] = React.useState<number>(1);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (setPage) {
      getDocs(null, null, null, page + 1, pageSize).then((res) => {
        dispatch(setDocs(res));
      });
    }
  }, [page]);
  return (
    <>
      {data.count > 0 && (
        <Box>
          <IconButton
            onClick={() => {
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
                rows={data.rows}
                paginationMode="server"
                pagination
                page={page}
                onPageChange={(newPage) => setPage(newPage)}
                rowCount={data.count}
                pageSize={pageSize}
                onPageSizeChange={(newPage) => setPageSize(newPage)}
                components={{
                  Toolbar: GridToolbar,
                }}
              />
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
}
