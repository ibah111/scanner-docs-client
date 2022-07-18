import { Button, Grid, IconButton, Typography } from "@mui/material";
import { Close } from "@mui/icons-material";
import { ipcRenderer } from "electron";
import React from "react";
import ZoomInMapIcon from "@mui/icons-material/ZoomInMap";
import SettingsOverscanIcon from "@mui/icons-material/SettingsOverscan";

export default function MenuBar() {
  return (
    <Grid container direction="row" justifyContent="space-between">
      <Grid item>
        <Typography>Документооборот</Typography>
      </Grid>
      <Grid item container direction="row">
        <Grid>
          <IconButton
            onClick={() => {
              ipcRenderer.send("minimize");
            }}
          >
            <ZoomInMapIcon />
          </IconButton>
        </Grid>
        <Grid>
          <IconButton
            onClick={() => {
              ipcRenderer.send("size");
            }}
          >
            <SettingsOverscanIcon />
          </IconButton>
        </Grid>
        <Grid>
          <IconButton
            onClick={() => {
              ipcRenderer.send("close");
            }}
          >
            <Close />
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  );
}
