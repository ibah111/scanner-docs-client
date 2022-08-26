import { DataGridPremium } from "@mui/x-data-grid-premium";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../Reducer";
import { Box, Grid } from "@mui/material";
import columnsTransmit from "./columnsTransmit";
import openHistory from "../../api/openHistory";
import { setTransmit } from "../../Reducer/openTransmit";

interface DialogHistoryProps {
  id: number;
}
export default function PrevTransmit({ id }: DialogHistoryProps) {
  const data = useAppSelector((state) => state.openTransmit);

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    openHistory(id).then((res) => {
      dispatch(setTransmit(res));
    });
  }, []);
  return (
    <>
      <Box sx={{ height: 400 }}>
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
            <DataGridPremium columns={columnsTransmit} rows={data} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
