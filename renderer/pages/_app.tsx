import React from 'react';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import type { AppProps } from 'next/app';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import 'reflect-metadata';
import { AdapterLuxon } from '@mui/x-date-pickers-pro/AdapterLuxon';
import { Provider } from 'react-redux';
import { RootReducerContext, store } from '../Reducer';
import 'moment/locale/ru';
import { SnackbarProvider } from 'notistack';
import MessageShow from '../components/MessageShow';
import 'moment-timezone';
import '../utils/crack';
import Update from '../components/Update';
import Connect from '../components/Connect';
import Login from '../components/Login/Login';
import MenuBar from '../components/menuBar';
import NavBar from '../components/NavBar/NavBar';
import { Grid } from '@mui/material';
import { createTheme } from '../lib/theme';

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <Provider store={store} context={RootReducerContext}>
        {/**
         * @TODO доделать
         */}
        <ThemeProvider theme={createTheme('dark')}>
          <LocalizationProvider adapterLocale={'ru'} dateAdapter={AdapterLuxon}>
            <SnackbarProvider maxSnack={3}>
              <Grid
                sx={{ height: '100vh', width: '100vw' }}
                container
                direction="column"
                justifyContent="flex-start"
                alignItems="center"
              >
                <MenuBar />
                <MessageShow />
                <Update />
                <CssBaseline />
                <Connect>
                  <Login>
                    <NavBar />
                    <Component {...pageProps} />
                  </Login>
                </Connect>
              </Grid>
            </SnackbarProvider>
          </LocalizationProvider>
        </ThemeProvider>
      </Provider>
    </React.Fragment>
  );
}
