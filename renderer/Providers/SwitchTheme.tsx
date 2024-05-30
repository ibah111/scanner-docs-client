import LightModeIcon from '@mui/icons-material/LightMode';
import { Button, Tooltip } from '@mui/material';
import React from 'react';
import { ColorModeContext } from './ThemeProvider';
export default function SwitchThemeIconButton() {
  const { toggleColorMode } = React.useContext(ColorModeContext);
  return (
    <>
      <Tooltip title="Сменить тему">
        <Button
          onClick={() => toggleColorMode()}
          color="inherit"
          id="basic-button"
          sx={{
            mt: 0.5,
          }}
        >
          <LightModeIcon />
        </Button>
      </Tooltip>
    </>
  );
}
