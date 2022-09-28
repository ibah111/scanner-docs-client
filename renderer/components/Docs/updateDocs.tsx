import { Button } from '@mui/material';
import React from 'react';
import Link from '../Link';

export default function UpdateDocs() {
  return (
    <>
      <Button
        id="basic-button"
        color="inherit"
        sx={{ width: '180px' }}
        variant="text"
        component={Link}
        href="../GridData"
      >
        Документы
      </Button>
    </>
  );
}
