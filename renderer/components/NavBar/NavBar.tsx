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
import SwitchThemeIconButton from '../../Providers/SwitchTheme';
import LocationReloadButton from './LocationReloadButton';

export default function NavBar() {
  const dispatch = useAppDispatch();
  return (
    <Grid item xs={0.5} sx={{ width: '100vw', height: '100%' }}>
      <AppBar position="static">
        <Toolbar disableGutters>
          <Grid container direction="row" flexWrap="wrap">
            {/**
             * Левая часть тулбара занимающшая 60% области
             */}
            <Grid
              item
              container
              direction="row"
              flexWrap="wrap"
              sx={{ flexBasis: '60%', mt: 0.5 }}
            >
              <Grid item sx={{ ml: 2 }}>
                <NavigationLinkButton
                  path={'/MainPage'}
                  name={'Подача'}
                  props={{
                    sx: {
                      width: '180px',
                    },
                  }}
                />
              </Grid>
              {/**
                 * 
              <Grid item sx={{ ml: 2 }}>
                  <NavigationLinkButton
                    path={'/DocumentAdder'}
                    name={'DocAdder (в разработке)'}
                    props={{
                      sx: {
                        width: '180px',
                      },
                    }}
                  />
              </Grid>
                   */}
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
            {/**
             * Правая часть тулбара занимающая 40% области
             */}
            <Grid
              item
              container
              direction="row-reverse"
              flexWrap="wrap"
              sx={{ flexBasis: '40%' }}
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
                <SwitchThemeIconButton />
              </Grid>
              <Grid item>
                <LocationReloadButton />
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Grid>
  );
}
