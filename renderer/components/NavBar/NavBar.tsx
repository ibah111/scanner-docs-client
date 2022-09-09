import { AppBar, Box, Button, Grid, Toolbar } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../Reducer';
import store from '../../lib/store';
import { resetLogin } from '../../Reducer/State';
import React from 'react';
import UpdateDocs from '../Docs/updateDocs';
import OpenAdminPage from '../Admin/OpenAdminPage';
import BackMainPage from './BackMainPage';
import OpenTableCodes from '../TableCodes/OpenTableCodes';

export default function NavBar() {
  const dispatch = useAppDispatch();
  const User = useAppSelector((state) => state.User);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar disableGutters>
          <Grid sx={{ pl: 3, pr: 5 }}>
            <BackMainPage />
          </Grid>
          <Grid sx={{ pl: 3, pr: 5 }}>
            {User.roles.includes('viewer_logs') && <UpdateDocs />}
          </Grid>
          <Grid sx={{ flexGrow: 1, pl: 3, pr: 5 }}>
            {User.roles.includes('admin') && <OpenAdminPage />}
          </Grid>
          <Grid sx={{ flexGrow: 1, pl: 3, pr: 5 }}>
            {User.roles.includes('former_box') && <OpenTableCodes />}
          </Grid>
          <Button
            color="inherit"
            onClick={() => {
              store.set('token', '');
              dispatch(resetLogin());
            }}
            sx={{ mr: 2 }}
          >
            Выход
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
