import { Grid, IconButton, Typography } from '@mui/material';
import { Close } from '@mui/icons-material';
import React from 'react';
import SettingsOverscanIcon from '@mui/icons-material/SettingsOverscan';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
interface MenuBarProps {
  version: string;
  back?: () => void;
}
export default function MenuBar({ back, version }: MenuBarProps) {
  return (
    <Grid item container direction="row" justifyContent="space-between">
      <Grid item sx={{ pt: 1 }}>
        <Grid item container direction="row">
          <Grid item sx={{ mt: -1 }}>
            {back && (
              <IconButton onClick={back}>
                <KeyboardReturnIcon />
              </IconButton>
            )}
          </Grid>
          <Grid item sx={{ ml: 2 }}>
            <Typography>Scanner Docs {version}</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item sx={{ WebkitAppRegion: 'drag' }} xs />
      <Grid item>
        <Grid item container direction="row">
          <Grid item>
            <IconButton
              onClick={() => {
                window.ipc.send('minimize');
              }}
            >
              <HorizontalRuleIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton
              onClick={() => {
                window.ipc.send('size');
              }}
            >
              <SettingsOverscanIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton
              onClick={() => {
                window.ipc.send('close');
              }}
            >
              <Close />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
