import { AppBar, Button, Grid, Toolbar } from '@mui/material';
import { useAppDispatch } from '../../Reducer';
import getStore from '../../lib/store';
import { relogin } from '../../Reducer/State';
import React from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import Scan from '../Scan';
import { Action, Subject } from '../../casl/casl';
import { Can } from '../../casl/casl.factory';
import NavigationLinkButton from './NavigationLinkButton';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SwitchTheme from '../../Providers/SwitchTheme';

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
                <NavigationLinkButton
                  path={'/MainPage'}
                  name={'Главная страница'}
                  props={{
                    sx: {
                      width: '180px',
                    },
                  }}
                />
              </Grid>
              <Grid item>
                <Can I={Action.Manage} a={Subject.Doc}>
                  <NavigationLinkButton
                    path={'/DocumentPage'}
                    name={'Документы'}
                    props={{
                      sx: {
                        width: '180px',
                      },
                    }}
                  />
                </Can>
              </Grid>
              <Grid item>
                <Can I={Action.Manage} a={Subject.Barcode}>
                  <NavigationLinkButton
                    path={'/RowsBoxData'}
                    name={'Создание короба'}
                    props={{
                      sx: {
                        width: '180px',
                      },
                    }}
                  />
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
                <NavigationLinkButton
                  path={'/AdminPage'}
                  icon={<AdminPanelSettingsIcon fontSize="large" />}
                />
                <Scan />
              </Grid>
              <Grid item>
                <SwitchTheme />
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Grid>
  );
}
