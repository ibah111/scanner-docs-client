import { Box, Grid } from "@mui/material";
import React from "react";
import Article from "./Components/article";
import Borrower from "./Components/borrower";
import CurrentHolder from "./Components/currentHolder";
import DateReceiving from "./Components/dateReceiving";
import DateSend from "./Components/dateSend";
import Enumerate from "./Components/enumerate";
import KD from "./Components/kd";
import Registry from "./Components/registry";
import SendingForm from "./Components/sendingForm";
import WhereSend from "./Components/whereSend";

export default function Main() {
  return (
    <Box>
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid
          item
          container
          direction="row"
          justifyContent="space-around"
          alignItems="center"
        >
          <Grid item>
            <Enumerate />
          </Grid>
          <DateReceiving />
          <Article />
          <KD />
          <Registry />
          <Borrower />
          <CurrentHolder />
          <DateSend />
          <WhereSend />
        </Grid>
        <Grid item>
          <SendingForm />
        </Grid>
      </Grid>
    </Box>
  );
}
