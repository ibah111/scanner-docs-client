import { AppBar, Button, Grid, Toolbar } from '@mui/material';
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
    <Grid item xs={0.5} sx={{ width: '100vw', height: '100%' }}>
      <AppBar position="static">
        <Toolbar disableGutters>
          <Grid container flexWrap="wrap">
            <Grid sx={{ flexGrow: 1, mt: 2, mb: 2, ml: 2 }}>
              <BackMainPage />
            </Grid>
            <Grid sx={{ flexGrow: 1, mt: 2, mb: 2, ml: 2 }}>
              {User.roles.includes('viewer_logs') && <UpdateDocs />}
            </Grid>
            <Grid sx={{ flexGrow: 1, mt: 2, mb: 2, ml: 2 }}>
              {User.roles.includes('former_box') && <OpenTableCodes />}
            </Grid>
            <Grid sx={{ flexGrow: 1, mt: 2, mb: 2, ml: 2 }}>
              {User.roles.includes('admin') && <OpenAdminPage />}
            </Grid>

            <Grid sx={{ flexGrow: -1, mr: 2, mt: 2, mb: 2, ml: 2 }}>
              <Button
                color="inherit"
                onClick={() => {
                  store.set('token', '');
                  dispatch(resetLogin());
                }}
              >
                Выход
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Grid>
  );
}
