import {
  AppBar,
  Box,
  Button,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useAppDispatch } from "../../Reducer";
import store from "../../lib/store";
import { resetLogin } from "../../Reducer/State";
import getDocs from "../../api/getDocs";
import { resetDocs, setDocs } from "../../Reducer/Docs";
import React from "react";
import Scan from "../Scan";
import UpdateDocs from "../Docs/UpdateDocs";
export default function NavBar() {
  const dispatch = useAppDispatch();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ mb: 5 }}>
        <Toolbar disableGutters>
          <Grid sx={{ pl: 3, pr: 5 }}>
            <UpdateDocs />
          </Grid>
          <Grid sx={{ flexGrow: 1 }}>
            <Scan />
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
