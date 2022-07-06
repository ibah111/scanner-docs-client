import { Box, Button, Grid, Link } from "@mui/material";
import React, { useEffect } from "react";
import { getData } from "../../api/connect";
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
  // const[data, setData] = React.useState([])
  // React.useEffect(()=> {
  //   getData(code).then((res) => {
  //       setData(res.code)
  //     })
  // })
  return (
    <Box>
      <Grid
        container
        direction="column"
        alignItems="center"
        spacing={7}
       
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
