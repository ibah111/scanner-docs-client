import { Grid, Typography } from '@mui/material';
import React from 'react';
import { socketConnect } from '../lib/socket';

const connect = (callback: (value: boolean) => void) => {
  const socket = socketConnect();
  socket.on('connect', () => {
    callback(true);
  });
  socket.on('disconnect', () => {
    callback(false);
  });
};
interface ConnectProps {
  children: React.ReactNode;
}

export default function Connect({ children }: ConnectProps) {
  const [connected, setConnected] = React.useState(false);
  React.useEffect(() => {
    connect(setConnected);
  }, []);
  return (
    <>
      {connected ? (
        children
      ) : (
        <Grid>
          <Typography>Нет соединения с сервером</Typography>
        </Grid>
      )}
    </>
  );
}
