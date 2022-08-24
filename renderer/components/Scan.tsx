import { Button, Menu, MenuItem } from "@mui/material";
import { ipcRenderer } from "electron";
import React from "react";
import { PortInfo } from "@serialport/bindings-cpp";
import { useAppDispatch } from "../Reducer";
import { resetData, setData } from "../Reducer/Data";
import getData from "../api/getData";
import { resetSend } from "../Reducer/Send";

export default function Scan() {
  const [ports, setPorts] = React.useState<PortInfo[]>([]);
  const [connected, setConnected] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    ipcRenderer.on("ports", (_, args) => {
      setPorts(args);
    });
    ipcRenderer.on("content", (_, args: string) => {
      dispatch(resetData());
      dispatch(resetSend());
      getData(args.replace("\r", "")).then((res) => {
        dispatch(setData(res));
      });
    });
    ipcRenderer.on("errorConnect", () => {
      setConnected(false);
    });
    ipcRenderer.on("successConnect", () => {
      setConnected(true);
    });
    ipcRenderer.on("successDisconnect", () => {
      setConnected(false);
    });
    ipcRenderer.send("requestPort");
  }, []);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      {!connected ? (
        <>
          <Button
            id="basic-button"
            color="secondary"
            sx={{ width: "180px" }}
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            variant="contained"
          >
            Подключить порт
          </Button>

          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose} sx={{ width: "180px" }}>
              <em>Нет</em>
            </MenuItem>
            {ports.map((port, index) => (
              <MenuItem
                key={index}
                onClick={() => {
                  ipcRenderer.send("connectPort", port.path);
                }}
              >
                {port.path}
              </MenuItem>
            ))}
            <MenuItem
              onClick={() => {
                ipcRenderer.send("requestPort");
              }}
              sx={{ width: "180px" }}
            >
              <em>Обновить</em>
            </MenuItem>
          </Menu>
        </>
      ) : (
        <>
          <Button
            onClick={() => {
              ipcRenderer.send("disconnectPort");
            }}
            color="secondary"
            sx={{ width: "180px" }}
            variant="contained"
          >
            Отключить порт
          </Button>
        </>
      )}
    </div>
  );
}
