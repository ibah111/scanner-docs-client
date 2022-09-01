import { Button } from '@mui/material';
import React from 'react';
import Link from '../Link';

export default function BackMainPage() {
  return (
    <>
      <Button
        id="basic-button"
        color="secondary"
        sx={{ width: '180px' }}
        variant="contained"
        component={Link}
        href="../MainPage"
      >
        Главная страница
      </Button>
    </>
  );
}
