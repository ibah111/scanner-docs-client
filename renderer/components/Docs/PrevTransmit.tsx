import { DataGridPremium } from '@mui/x-data-grid-premium';
import React from 'react';
import { Box } from '@mui/material';
import columnsTransmit from './columnsTransmit';
import openHistory from '../../api/openHistory';
import { Log } from '../../Schemas/Log.model';

interface DialogHistoryProps {
  id: number;
}
export default function PrevTransmit({ id }: DialogHistoryProps) {
  const [data, setData] = React.useState<Log[]>([]);

  React.useEffect(() => {
    openHistory(id).then((res) => {
      setData(res);
    });
  }, []);
  return (
    <>
      <Box sx={{ height: 400 }}>
        <DataGridPremium columns={columnsTransmit} rows={data} />
      </Box>
    </>
  );
}
