import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  LinearProgress,
  LinearProgressProps,
  Typography,
} from "@mui/material";
import { ipcRenderer } from "electron";
import React from "react";
import store from "../lib/store";
import { useAppDispatch } from "../Reducer";
import { callSuccess } from "../Reducer/Message";
import { UpdateInfo } from "electron-updater";

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

export default function Update() {
  const [downloading, setDownloading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [mandatory, setMandatory] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [progress, setProgress] = React.useState(0);
  const [downloaded, setDownloaded] = React.useState(false);
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    ipcRenderer.on(
      "update-available",
      (event, text: UpdateInfo & { mandatory: boolean }) => {
        setOpen(true);
        setMandatory(text.mandatory);
        setMessage("Доступно обновление. Скачать обновление сейчас?");
      }
    );
    ipcRenderer.on("message-error", () => {
      setMessage("Ошибка при обновлении");
    });
    ipcRenderer.on("download-progress", (_, text: number) => {
      setProgress(text);
    });
    ipcRenderer.on("update-downloaded", () => {
      setDownloading(false);
      setDownloaded(true);
    });
    ipcRenderer.on("version", (event, params) => {
      const version = store.get("version");
      if (version !== params)
        dispatch(callSuccess("Обновление произошло успешно"));
      store.set("version", params);
    });
    ipcRenderer.send("check_version");
  }, []);

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <>
        <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              backgroundColor: "#cfe8fc",
            },
          }}
        >
          <DialogTitle>{message}</DialogTitle>
          <DialogContent>
            {downloading && (
              <>
                <DialogContentText>Скачивается обновление</DialogContentText>
                <LinearProgressWithLabel value={progress} />
              </>
            )}
            {downloaded && (
              <>
                <Button
                  onClick={() => {
                    ipcRenderer.send("update-install");
                  }}
                  variant="contained"
                  color="primary"
                >
                  Установить
                </Button>
              </>
            )}
          </DialogContent>
          <DialogActions>
            {!downloading && (
              <>
                <Button
                  onClick={() => {
                    ipcRenderer.send("update-download");
                    setDownloading(true);
                  }}
                  variant="contained"
                  color="primary"
                >
                  Да
                </Button>

                {!mandatory && (
                  <Button
                    onClick={handleClose}
                    variant="contained"
                    color="secondary"
                  >
                    Нет
                  </Button>
                )}
              </>
            )}
          </DialogActions>
        </Dialog>
      </>
    </div>
  );
}
