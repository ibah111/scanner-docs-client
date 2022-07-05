import React from "react";
import Head from "next/head";
import { makeStyles, createStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import { Grid, Theme } from "@mui/material";
import Link from "../components/Link";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: "center",
      paddingTop: theme.spacing(4),
    },
  })
);

function Home() {
  const classes = useStyles({});
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <Head>
        <title>Home - Nextron (with-typescript-material-ui)</title>
      </Head>
      <div className={classes.root}>
        <Grid
          container
          direction="row"
          justifyContent="space-around"
          alignItems="center"
        >
          <Button component={Link} variant="outlined" href="/ScanPage">
            Сканировать
          </Button>
          <Button component={Link} variant="outlined" href="/MainPage/main">
            Вывести информацию
          </Button>
        </Grid>
      </div>
    </React.Fragment>
  );
}

export default Home;
