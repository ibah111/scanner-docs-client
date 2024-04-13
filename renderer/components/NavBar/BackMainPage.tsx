import { Button } from '@mui/material';
import React from 'react';
import Link from '../Linker';
/**@deprecated */
export default function MainPage() {
  const path = '/MainPage';
  return (
    <>
      <Button
        id="basic-button"
        color="inherit"
        sx={{ width: '180px' }}
        variant="text"
        component={Link}
        href={`..${path}`}
      >
        Главная страница
      </Button>
    </>
  );
}
