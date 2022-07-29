import { Grid, Typography } from "@mui/material";
import axios, { AxiosError } from "axios";
import React from "react";
import { store, useAppDispatch, useAppSelector } from "../Reducer";
import { callError } from "../Reducer/Message";
import { resetLogin, setState } from "../Reducer/State";
import { AuthUserSuccess } from "../Schemas/Auth";
import { getToken } from "../utils/getToken";
import server from "../utils/server";
import Authorization from "./MainPage/Authorization";

const connect = async (callback: (value: boolean) => void) => {
  const token = getToken();
  if (token.token) {
    try {
      const result = await axios.post<AuthUserSuccess>(server() + "/login", {
        ...token,
      });
      if (result.data.login_result === true) {
        callback(true);
      } else {
        callback(false);
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        store.dispatch(callError(e.response.data.message));
        callback(false);
      }
      throw e;
    }
  } else {
    callback(false);
  }
};
export default function Login({ children }: any) {
  const dispatch = useAppDispatch();
  const reload = useAppSelector((state) => state.State.login);
  const [loged, setLoged] = React.useState(false);
  React.useEffect(() => {
    if (reload) {
      dispatch(setState(["login", false]));
      connect(setLoged);
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
      )}
    </>
  );
}
