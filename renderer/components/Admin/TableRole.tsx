import { Box, Button, Grid } from "@mui/material";
import { DataGridPremium } from "@mui/x-data-grid-premium";
import { useAppDispatch, useAppSelector } from "../../Reducer";
import columns from "./columns";
import getRoles from "../../api/getRoles";
import { setRoles } from "../../Reducer/Roles";
import React from "react";
import removeRole from "../../api/removeRole";

export default function TableRole() {
  const data = useAppSelector((state) => state.Roles);
  const rows = data ? data : [];
  const dispatch = useAppDispatch();
  const [rowsData, setRowsData] = React.useState([]);
  const onRowsSelectionHandler = (ids) => {
    setRowsData(ids.map((id) => rows.find((row) => row.id === id)));
  };
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
              rows={rows}
              checkboxSelection
              onSelectionModelChange={(ids) => onRowsSelectionHandler(ids)}
            />
          </Grid>
          <Grid item>
            <Button
              onClick={() => {
                getRoles().then((res) => {
                  dispatch(setRoles(res));
                });
              }}
            >
              Открыть
            </Button>
          </Grid>
          <Grid item>
            <Button
              onClick={() => {
                removeRole(rowsData[0].id);
              }}
            >
              Удалить
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
