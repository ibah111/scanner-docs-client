import { Box, Grid, IconButton, Typography } from '@mui/material';
import { Close } from '@mui/icons-material';
import { ipcRenderer } from 'electron';
import React from 'react';
import SettingsOverscanIcon from '@mui/icons-material/SettingsOverscan';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
interface MenuBarProps {
  back?: () => void;
}
export default function MenuBar({ back }: MenuBarProps) {
  return (
    <Box sx={{ pl: 3, width: '100%' }}>
      <Grid container direction="row" justifyContent="space-between">
        <Grid item sx={{ pt: 1 }}>
          <Grid item container direction="row">
            <Grid item sx={{ mt: -1 }}>
              {back && (
                <IconButton onClick={back}>
                  <KeyboardReturnIcon />
                </IconButton>
              )}
            </Grid>
            <Grid item>
              <Typography>Scanner Docs</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sx={{ WebkitAppRegion: 'drag' }} xs />
        <Grid item>
          <Grid item container direction="row">
            <Grid item>
              <IconButton
                onClick={() => {
                  ipcRenderer.send('minimize');
                }}
              >
                <HorizontalRuleIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton
                onClick={() => {
                  ipcRenderer.send('size');
                }}
              >
                <SettingsOverscanIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton
                onClick={() => {
                  ipcRenderer.send('close');
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
