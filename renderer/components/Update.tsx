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
} from '@mui/material';
import React from 'react';
import getStore from '../lib/store';
import { useAppDispatch } from '../Reducer';
import { addMessage } from '../Reducer/Message';
import { UpdateInfo } from 'electron-updater';

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number },
) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

export default function Update() {
  const [downloading, setDownloading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [mandatory, setMandatory] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [progress, setProgress] = React.useState(0);
  const [downloaded, setDownloaded] = React.useState(false);
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    window.ipc.on(
      'update-available',
      (event, text: UpdateInfo & { mandatory: boolean }) => {
        setOpen(true);
        setMandatory(text.mandatory);
        setMessage('Доступно обновление. Скачать обновление сейчас?');
      },
    );
    window.ipc.on('message-error', () => {
      setMessage('Ошибка при обновлении');
    });
    window.ipc.on('download-progress', (_, text: number) => {
      setProgress(text);
    });
    window.ipc.on('update-downloaded', () => {
      setDownloading(false);
      setDownloaded(true);
    });
    window.ipc.on('version', (event, params) => {
      const version = getStore().get('version');
      if (version !== params) dispatch(addMessage());
      getStore().set('version', params);
    });
    window.ipc.send('check_version');
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
              backgroundColor: '#cfe8fc',
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
                    window.ipc.send('update-install');
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
                    window.ipc.send('update-download');
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
