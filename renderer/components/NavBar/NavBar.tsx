import { AppBar, Button, Grid, Toolbar } from '@mui/material';
import { useAppDispatch } from '../../Reducer';
import getStore from '../../lib/store';
import { relogin } from '../../Reducer/State';
import React from 'react';
import OpenAdminPage from '../Admin/OpenAdminPage';
import BackMainPage from './BackMainPage';
import RowBoxData from './RowsBoxData';
import LogoutIcon from '@mui/icons-material/Logout';
import Scan from '../Scan';
import { Action, Subject } from '../../casl/casl';
import { Can } from '../../casl/casl.factory';
import UpdateDocs from './UpdateDocs';

export default function NavBar() {
  const dispatch = useAppDispatch();
  return (
    <Grid item xs={0.5} sx={{ width: '100vw', height: '100%' }}>
      <AppBar position="static">
        <Toolbar disableGutters>
          <Grid container direction="row" flexWrap="wrap">
            <Grid
              item
              container
              direction="row"
              flexWrap="wrap"
              sx={{ flexBasis: '75%', mt: 0.5 }}
            >
              <Grid item sx={{ ml: 2 }}>
                <BackMainPage />
              </Grid>
              <Grid item>
                <Can I={Action.Manage} a={Subject.Doc}>
                  <UpdateDocs />
                </Can>
              </Grid>
              <Grid item>
                <Can I={Action.Manage} a={Subject.Barcode}>
                  <RowBoxData />
                </Can>
              </Grid>
            </Grid>
            <Grid
              item
              container
              direction="row-reverse"
              flexWrap="wrap"
              sx={{ flexBasis: '25%' }}
            >
              <Grid item>
                <Button
                  color="inherit"
                  onClick={() => {
                    getStore().set('token', '');
                    dispatch(relogin());
                  }}
                  sx={{ mt: 0.5 }}
                >
                  <LogoutIcon fontSize="medium" />
                </Button>
              </Grid>
              <Grid item>
                <OpenAdminPage />
              </Grid>
              <Grid item>
                <Scan />
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Grid>
  );
}
