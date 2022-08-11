import { Close } from "@mui/icons-material";
import { Box, Grid, IconButton } from "@mui/material";
import { DataGridPremium, GridFilterModel } from "@mui/x-data-grid-premium";
import React from "react";
import getDocs from "../../api/getDocs";
import { useAppDispatch, useAppSelector } from "../../Reducer";
import { resetDocs, setDocs } from "../../Reducer/Docs";
import { setComponents } from "../../Reducer/DocsComponent";
import columns from "./columns";

export default function Docs() {
  const data = useAppSelector((state) => state.Docs);
  const [pageSize, setPageSize] = React.useState<number>(25);
  const [page, setPage] = React.useState<number>(0);
  const dispatch = useAppDispatch();
  const onFilterChange = (filter: GridFilterModel) => {};
  React.useEffect(() => {
    if (page || pageSize) {
      dispatch(setComponents(["page", page + 1]));
      dispatch(setComponents(["pageSize", pageSize]));
      getDocs().then((res) => {
        dispatch(setDocs(res));
      });
    }
  }, [page]);
  return (
    <>
      {data.count > 0 && (
        <Box>
          <Grid
            container
            direction="column"
            alignItems="center"
            height="100%"
            width="100%"
          >
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
                filterMode="server"
                onFilterModelChange={onFilterChange}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              />
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
}
