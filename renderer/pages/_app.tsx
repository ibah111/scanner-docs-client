import React from "react";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { theme } from "../lib/theme";
import type { AppProps } from "next/app";
import { LocalizationProvider } from "@mui/x-date-pickers";

import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { Provider } from "react-redux";
import { store } from "../Reducer";
import "moment/locale/ru";
export default function (props: AppProps) {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
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
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <LocalizationProvider
            adapterLocale={"ru"}
            dateAdapter={AdapterMoment}
          >
            <CssBaseline />
            <Component {...pageProps} />
          </LocalizationProvider>
        </ThemeProvider>
      </Provider>
    </React.Fragment>
  );
}
