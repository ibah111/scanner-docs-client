import { AppBar, Box, Button, Grid, Toolbar } from "@mui/material";
import { useAppDispatch } from "../../Reducer";
import store from "../../lib/store";
import { resetLogin } from "../../Reducer/State";
import React from "react";
import UpdateDocs from "../Docs/updateDocs";

export default function NavBar() {
  const dispatch = useAppDispatch();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar disableGutters>
          <Grid sx={{ flexGrow: 1, pl: 3, pr: 5 }}>
            <UpdateDocs />
          </Grid>

          <Button
            color="inherit"
            onClick={() => {
              store.set("token", "");
              dispatch(resetLogin());
            }}
            sx={{ mr: 2 }}
          >
            Выход
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
