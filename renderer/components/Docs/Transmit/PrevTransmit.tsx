import { DataGridPremium } from '@mui/x-data-grid-premium';
import React from 'react';
import { Box } from '@mui/material';
import useTransmit from './useTransmit';
interface transmit {
  id: number;
}
export default function PrevTransmit({ id }: transmit) {
  const { ...gridProps } = useTransmit(id);
  return (
    <>
      <Box sx={{ height: 400 }}>
        <DataGridPremium {...gridProps} />
      </Box>
    </>
  );
}
