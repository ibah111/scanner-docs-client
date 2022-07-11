import axios, { AxiosError } from "axios";
import moment from "moment";
import { store } from "../Reducer";
import { callError } from "../Reducer/Message";
import { getToken } from "../utils/getToken";
import server from "../utils/server";

export default async function SendData() {
  const data = store.getState().Send;
  const id = store.getState().Data.id;
  const addons: any = {};
  if (!data.DateSend) {
    addons.DateSend = moment().toISOString();
  }
  try {
    const result = await axios.post(server() + "/send", {
      ...getToken(),
      ...data,
      ...addons,
      id,
    });
    return result.data;
  } catch (e) {
    if (e instanceof AxiosError)
      if (e.code === "ERR_BAD_REQUEST") {
        if (Array.isArray(e.response.data?.message)) {
          for (const value of e.response.data?.message) {
            console.log(value);
            store.dispatch(callError(value));
          }
        }
      } else {
        store.dispatch(callError("Произошла непредвиденная ошибка"));
      }
    throw e;
  }
}
