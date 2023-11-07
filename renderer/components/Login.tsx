import { Grid, Typography } from '@mui/material';

import React from 'react';
import { useAppDispatch, useAppSelector } from '../Reducer';
import { resetLogin, setState } from '../Reducer/State';
import Authorization from './MainPage/Authorization';
import getToken from '../api/getToken';
import { setUser } from '../Reducer/User';

interface LoginProps {
  children: React.ReactNode;
}

export default function Login({ children }: LoginProps) {
  const dispatch = useAppDispatch();
  const reload = useAppSelector((state) => state.State.login);
  const [loged, setLoged] = React.useState(false);
  React.useEffect(() => {
    if (reload) {
      getToken().subscribe({
        next: (data) => {
          dispatch(setUser(data));
          setLoged(data.login_result);
        },
        error: () => {
          dispatch(setUser(null));
        },
        complete: () => {
          dispatch(setState(['login', false]));
        },
      });
    }
  }, [reload]);
  React.useEffect(() => {
    dispatch(resetLogin());
  }, []);
  return (
    <>
      {loged ? (
        children
      ) : (
        <Grid item xs>
          <Grid
            container
            direction="column"
            alignItems="center"
            spacing={4}
            height="100%"
          >
            <Grid item>
              <Typography variant="h4">Вы не авторизованы</Typography>
            </Grid>
            <Grid item>
              <Authorization />
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
}
