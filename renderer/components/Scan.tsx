import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { ipcRenderer } from "electron";
import React from "react";
import { PortInfo } from "@serialport/bindings-cpp";
import Link from "./Link";
import { useAppDispatch } from "../Reducer";
import { resetData, setData } from "../Reducer/Data";
import getData from "../api/getData";
import { resetSend } from "../Reducer/Send";

export default function Scan() {
  const [ports, setPorts] = React.useState<PortInfo[]>([]);
  const [port, setPort] = React.useState("");
  const [connected, setConnected] = React.useState(false);
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    ipcRenderer.on("ports", (event, args) => {
      setPorts(args);
    });
    ipcRenderer.on("content", (event, args: string) => {
      dispatch(resetData());
      dispatch(resetSend());
      getData(args.replace("\r", "")).then((res) => {
        dispatch(setData(res));
      });
    });
    ipcRenderer.on("errorConnect", (event, args) => {
      console.log(args);
    });
    ipcRenderer.on("successConnect", (event, args) => {
      setConnected(true);
    });
    ipcRenderer.on("successDisconnect", (event, args) => {
      setConnected(false);
    });
    ipcRenderer.send("requestPort");
  }, []);
  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="space-around"
        alignItems="center"
      >
        {!connected && (
          <>
            <FormControl sx={{ width: "75ch" }} fullWidth>
              <InputLabel id="port-label">Порты</InputLabel>
              <Select
                labelId={"port-label"}
                label={"Порты"}
                value={port}
                onChange={(event) => {
                  setPort(event.target.value);
                }}
              >
                <MenuItem key={0} value="">
                  <em>Нет</em>
                </MenuItem>
                {ports.map((port, index) => (
                  <MenuItem key={index + 1} value={port.path}>
                    {port.path}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {port !== "" && (
              <Button
                onClick={() => {
                  ipcRenderer.send("connectPort", port);
                }}
              >
                Подключить порт
              </Button>
            )}
          </>
        )}
        {connected && (
          <Button
            onClick={() => {
              ipcRenderer.send("disconnectPort");
            }}
          >
            Отключить порт
          </Button>
        )}
      </Grid>
    </>
  );
}
