import { Box, Grid, IconButton, Typography } from "@mui/material";
import { Close } from "@mui/icons-material";
import { ipcRenderer } from "electron";
import React from "react";
import SettingsOverscanIcon from "@mui/icons-material/SettingsOverscan";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";

export default function MenuBar() {
  return (
    <Box sx={{ pl: 3, width: "100%" }}>
      <Grid container direction="row" justifyContent="space-between">
        <Grid item sx={{ pt: 1 }}>
          <Typography>Документооборот</Typography>
        </Grid>
        <Grid item sx={{ WebkitAppRegion: "drag" }} xs></Grid>
        <Grid item>
          <Grid item container direction="row">
            <Grid item>
              <IconButton
                onClick={() => {
                  ipcRenderer.send("minimize");
                }}
              >
                <HorizontalRuleIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton
                onClick={() => {
                  ipcRenderer.send("size");
                }}
              >
                <SettingsOverscanIcon />
              </IconButton>
            </Grid>
            <Grid item>
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
      </Grid>
    </Box>
  );
}
