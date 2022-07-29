import { Grid, Typography } from "@mui/material";
import axios, { AxiosError } from "axios";
import React from "react";
import { store } from "../Reducer";
import { callError } from "../Reducer/Message";
import { getToken } from "../utils/getToken";
import server from "../utils/server";
import Authorization from "./MainPage/Authorization";

const connect = async (callback: (value: boolean) => void) => {
  const token = getToken();
  try {
    const result = await axios({
      method: "POST",
      url: server() + "/login",
      data: { token },
    });

    if (result.data === "OK") {
      callback(true);
    }
  } catch (e) {
    if (e instanceof AxiosError) {
      store.dispatch(callError(e.response.data.message));
      console.log("error");
    }
    throw e;
  }
};
export default function Login({ children }: any) {
  const [loged, setLoged] = React.useState(false);
  React.useEffect(() => {
    connect(setLoged);
  }, []);
  return (
    <>
      {loged ? (
        children
      ) : (
        <Grid>
          <Typography>Вы не авторизованы</Typography>
          <Authorization />
        </Grid>
      )}
    </>
  );
}
