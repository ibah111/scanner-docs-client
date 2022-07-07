import { Box, Grid, TableContainer, Typography } from "@mui/material";
import { DataGrid, GridColumns } from "@mui/x-data-grid";
import React from "react";
import { useAppSelector } from "../../../Reducer";

interface Article {
  st_pnkt: string;
}

export default function Article() {
  const data = useAppSelector((state) => state.Data?.doc.st_pnkt);
  return (
    <Box>
      <Grid container direction="row" justifyContent="flex-start">
        <Grid item>
          <Typography>
          Статья и пункт 
          </Typography>
        </Grid>
        <Grid item>{data}</Grid>
      </Grid>
    </Box>


    // <React.Fragment>
    //   <Typography>
    //     Статья и пункт <br /> {data}
    //   </Typography>
    // </React.Fragment>
  );
}
