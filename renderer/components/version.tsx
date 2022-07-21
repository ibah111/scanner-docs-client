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

export default function Version() {
  const [downloading, setDownloading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [progress, setProgress] = React.useState(0);
  const [downloaded, setDownloaded] = React.useState(false);
  React.useEffect(() => {
    ipcRenderer.on("update-available", (event, text: string) => {
      setOpen(true);
      setMessage("Доступно обновление. Скачать обновление сейчас?");
    });
    ipcRenderer.on("message-error", (event, text: string) => {
      setMessage("Ошибка при обновлении");
    });
    ipcRenderer.on("download-progress", (event, text: number) => {
      setProgress(text);
    });
    ipcRenderer.on("update-downloaded", () => {
      setDownloading(false);
      setDownloaded(true);
    });
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{message}</DialogTitle>
          <DialogContent>
            {downloading && <LinearProgressWithLabel value={progress} />}
            {downloaded && (
              <>
                <Button
                  onClick={() => {
                    ipcRenderer.send("update-install");
                  }}
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
                >
                  Да
                </Button>

                <Button onClick={handleClose}>Нет</Button>
              </>
            )}
          </DialogActions>
        </Dialog>
      </>
    </div>
  );
}
