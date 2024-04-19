import { AppBar, Dialog, IconButton, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { useAppDispatch } from '../../Reducer';
import CloseIcon from '@mui/icons-material/Close';
import { Transition } from '../../Styles/Transtion';
import Send from './SendComponents';
import search from '../../apiSend/Search/search';
import { setLoadingResults, setResults } from '../../Reducer/Results';
interface SendingFormInterface {
  open: boolean;
  onClose: VoidFunction;
}
export default function SendingForm({ ...props }: SendingFormInterface) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useAppDispatch();
  const handleClose = () => props.onClose();

  React.useEffect(() => {
    search().subscribe({
      next: (res) => {
        dispatch(setResults(res));
        dispatch(setLoadingResults(false));
      },
      error: () => {
        setLoadingResults(false);
      },
    });
  }, []);
  return (
    <Dialog {...props} fullScreen TransitionComponent={Transition}>
      <React.Fragment>
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Подача
            </Typography>
          </Toolbar>
        </AppBar>
        {/**
         * Send components
         */}
        <>
          <Send />
        </>
      </React.Fragment>
    </Dialog>
  );
}
