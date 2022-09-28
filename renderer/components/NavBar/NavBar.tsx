import { AppBar, Box, Button, Grid, Toolbar } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../Reducer';
import store from '../../lib/store';
import { resetLogin } from '../../Reducer/State';
import React from 'react';
import UpdateDocs from '../Docs/updateDocs';
import OpenAdminPage from '../Admin/OpenAdminPage';
import BackMainPage from './BackMainPage';
import OpenTableCodes from '../TableCodes/OpenTableCodes';
import LogoutIcon from '@mui/icons-material/Logout';

export default function NavBar() {
  const dispatch = useAppDispatch();
  const User = useAppSelector((state) => state.User);
  return (
    <Grid item xs={0.5} sx={{ width: '100vw', height: '100%' }}>
      <Box>
        <AppBar position="static">
          <Toolbar disableGutters>
            <Grid container direction="row" flexWrap="wrap">
              <Grid
                item
                container
                direction="row"
                flexWrap="wrap"
                sx={{ flexBasis: '50%' }}
              >
                <Grid sx={{ ml: 2 }}>
                  <BackMainPage />
                </Grid>
                <Grid>
                  {User.roles.includes('viewer_logs') && <UpdateDocs />}
                </Grid>
                <Grid>
                  {User.roles.includes('former_box') && <OpenTableCodes />}
                </Grid>
              </Grid>
              <Grid
                item
                container
                direction="row-reverse"
                flexWrap="wrap"
                sx={{ flexBasis: '50%' }}
              >
                <Grid>
                  <Button
                    color="inherit"
                    onClick={() => {
                      store.set('token', '');
                      dispatch(resetLogin());
                    }}
                    sx={{ mt: 0.5 }}
                  >
                    <LogoutIcon fontSize="medium" />
                  </Button>
                </Grid>
                <Grid>{User.roles.includes('admin') && <OpenAdminPage />}</Grid>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </Box>
    </Grid>
  );
}
