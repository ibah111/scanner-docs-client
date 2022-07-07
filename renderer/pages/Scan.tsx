import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { ipcRenderer } from "electron";
import React from "react";
import { PortInfo } from "@serialport/bindings-cpp";
import Link from "../components/Link";
import { getData } from "../api/connect";
import { useAppDispatch } from "../Reducer";
import { setData } from "../Reducer/Data";

export default function Scan() {
  const [ports, setPorts] = React.useState<PortInfo[]>([]);
  const [port, setPort] = React.useState("");
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    ipcRenderer.on("ports", (event, args) => {
      setPorts(args);
    });
    ipcRenderer.on("content", (event, args: string) => {
      getData(args.replace("\r", "")).then((res) => {
        console.log(res);
        dispatch(setData(res));
      });
    });
    ipcRenderer.on("errorConnect", (event, args) => {
      console.log(args);
    });
    ipcRenderer.on("successConnect", (event, args) => {
      console.log("successConnect");
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
            <Button component={Link} href="/home">
              Вернуться
            </Button>
            <MenuItem key={0} value="">
              <em>None</em>
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
      </Grid>
    </>
  );
}
