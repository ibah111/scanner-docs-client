import { Grid, Typography } from "@mui/material";
import React from "react";
import { io } from "socket.io-client";
import server from "../utils/server";

const connect = (callback: (value: boolean) => void) => {
  const socket = io(server());
  socket.on("connect", () => {
    callback(true);
  });
  socket.on("disconnect", () => {
    callback(false);
  });
};

export default function Connect({ children }: any) {
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
