import { Alert, Box, Grid } from "@mui/material";
import {
  DataGridPremium,
  GridFilterModel,
  GridSortModel,
} from "@mui/x-data-grid-premium";
import React from "react";
import getDocs from "../../api/getDocs";
import { useAppDispatch, useAppSelector } from "../../Reducer";
import { setDocs } from "../../Reducer/Docs";
import { setComponents } from "../../Reducer/DocsComponent";
import columns from "./columns";
import PrevTransmit from "./PrevTransmit";

export default function Docs() {
  const data = useAppSelector((state) => state.Docs);
  const [pageSize, setPageSize] = React.useState<number>(25);
  const [page, setPage] = React.useState<number>(0);
  const dispatch = useAppDispatch();
  const onFilterChange = (filter: GridFilterModel) => {
    dispatch(setComponents(["filterModel", filter]));
    getDocs().then((res) => {
      dispatch(setDocs(res));
    });
  };
  const handleSortModelChange = (sort: GridSortModel) => {
    dispatch(setComponents(["sortModel", sort]));
    getDocs().then((res) => {
      dispatch(setDocs(res));
    });
  };
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
              sx={{ pl: 3, pr: 3, pt: 2 }}
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
              sortingMode="server"
              onSortModelChange={handleSortModelChange}
              pageSize={pageSize}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              getDetailPanelContent={({ row }) => (
                <Box>
                  <PrevTransmit id={row.id} />
                </Box>
              )}
              getDetailPanelHeight={() => "auto"}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
