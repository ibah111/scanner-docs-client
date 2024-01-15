import { Grid, Typography } from '@mui/material';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../Reducer';
import { relogin, loged as logedAction } from '../../Reducer/State';
import Authorization from '../MainPage/Authorization';
import { resetUser, setUser } from '../../Reducer/User';
import { CaslContext } from '../../casl/casl.factory';
import { createUserAbility } from '../../casl/casl';
import getToken from '../../api/Login/getToken';

interface LoginProps {
  children: React.ReactNode;
}

export default function Login({ children }: LoginProps) {
  const dispatch = useAppDispatch();
  const reload = useAppSelector((state) => state.State.requireLogin);
  const [loged, setLoged] = React.useState(false);
  const [ability, setAbility] = React.useState(createUserAbility());

  React.useEffect(() => {
    if (reload) {
      dispatch(resetUser());
      setLoged(false);
      const sub = getToken().subscribe({
        next: (data) => {
          dispatch(setUser(data));
          setLoged(data.login_result);
          setAbility(createUserAbility(data));
        },
        complete: () => {
          dispatch(logedAction());
        },
      });
      return sub.unsubscribe.bind(sub);
    }
  }, [reload]);
  React.useEffect(() => {
    dispatch(relogin());
  }, []);
  return (
    <>
      {loged ? (
        <CaslContext.Provider value={ability}>{children}</CaslContext.Provider>
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
            <Grid item>
              Вы в режиме:{' '}
              {process.env.NODE_ENV === 'production' ? 'рабочая' : 'тестовая'}
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
}
