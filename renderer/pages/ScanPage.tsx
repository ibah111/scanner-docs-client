import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { ipcRenderer } from "electron";
import React from "react";
import { PortInfo } from "@serialport/bindings-cpp";
import Link from "../components/Link";

export default function ScanPage() {
  const [ports, setPorts] = React.useState<PortInfo[]>([]);
  const [port, setPort] = React.useState("");
  const [content, setContent] = React.useState("");
  React.useEffect(() => {
    ipcRenderer.on("ports", (event, args) => {
      setPorts(args);
    });
    ipcRenderer.on("content", (event, args) => {
      setContent(args);
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
      <Button component={Link} href="/home">
        Вернуться
      </Button>
      <FormControl fullWidth>
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
      <Typography>{content}</Typography>
    </>
  );
}
