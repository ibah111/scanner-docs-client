import { AppBar, Dialog, IconButton, Toolbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';
import { send_server } from '../../../../../../../utils/sendUtils/send_server';

interface DialogFileProps {
  open: boolean;
  file: null | number;
  onClose: () => void;
}
export default function DialogFile({ open, onClose, file }: DialogFileProps) {
  const data = React.useMemo(
    () =>
      file
        ? new URL('documents/' + file.toString(), send_server()).toString()
        : '',
    [file],
  );
  return (
    <>
      <Dialog fullScreen open={open} onClose={onClose}>
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={onClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <iframe width="100%" height="100%" title="Документ" src={data} />
      </Dialog>
    </>
  );
}
