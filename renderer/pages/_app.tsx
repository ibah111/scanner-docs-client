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
import '../locale';
import moment from 'moment';
import getStore from '../lib/store';
export default function App(props: AppProps) {
  const [versionApp, setVersionApp] = React.useState<string>('');
  const { Component, pageProps } = props;
  React.useEffect(() => {
    /**
     * Я не могу вызвать диспатч в этом useEffect
     * потому что App - является корневым элементом
     * и контекст для него обозначается ниже и если на этот уровне
     * вызвать что либо связанное с контекстом, то будет выдаваться ошибка,
     * в контексте которой он не знает контекста и ругается на это
     */
    const ver = getStore().get('version') as string;
    setVersionApp(ver);
    moment.locale('ru');
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
                <MenuBar version={versionApp} />
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
