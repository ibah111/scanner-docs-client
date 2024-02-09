import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import React from 'react';
import { textConst } from './text';

export default function InfoAdornment() {
  const [open, setOpen] = React.useState<boolean>(false);

  const descriptionElementRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);
  return (
    <>
      <Tooltip title={'Доп.инфо'}>
        <IconButton onClick={() => setOpen(true)}>
          <InfoIcon />
        </IconButton>
      </Tooltip>
      <Dialog
        scroll="paper"
        open={open}
        onClose={() => setOpen(false)}
        maxWidth={'md'}
      >
        <DialogTitle>Information</DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText
            id="scroll-dialog-element"
            tabIndex={-1}
            ref={descriptionElementRef}
          >
            {textConst}
          </DialogContentText>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button
            color="error"
            variant="contained"
            onClick={() => setOpen(false)}
          >
            <Typography>Close</Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
