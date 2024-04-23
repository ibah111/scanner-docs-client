import LightModeIcon from '@mui/icons-material/LightMode';
import { Button } from '@mui/material';
import React from 'react';
import { ColorModeContext } from './ThemeProvider';
export default function SwitchTheme() {
  const { toggleColorMode } = React.useContext(ColorModeContext);
  return (
    <>
      <Button
        color="inherit"
        onClick={() => toggleColorMode()}
        id="basic-button"
        sx={{
          mt: 0.5,
        }}
      >
        <LightModeIcon />
      </Button>
    </>
  );
}
