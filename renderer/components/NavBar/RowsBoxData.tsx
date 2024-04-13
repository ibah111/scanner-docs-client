import { Button } from '@mui/material';
import React from 'react';
import Link from '../Linker';
import { useRouter } from 'next/router';
/**
 * @deprecated
 */
export default function RowsBoxData() {
  const currentPath = useRouter().pathname;

  const path = '/RowsBoxData';
  return (
    <>
      <Button
        variant={currentPath === path ? 'contained' : 'text'}
        id="basic-button"
        color="inherit"
        sx={{ width: '180px' }}
        component={Link}
        href={`..${path}`}
      >
        Создание короба
      </Button>
    </>
  );
}
