import { Button } from '@mui/material';
import React from 'react';
import Link from '../Link';

export default function BackMainPage() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  return (
    <>
      <Button
        id="basic-button"
        color="secondary"
        sx={{ width: '180px' }}
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        component={Link}
        href="../MainPage"
      >
        Главная страница
      </Button>
    </>
  );
}
