import axios from "axios";
import { store } from "../Reducer";
import { callError } from "../Reducer/Message";
import { getToken } from "../utils/getToken";
import server from "../utils/server";

export default async function SendData() {
  const data = store.getState().Send;
  try {
    const result = await axios.post(server() + "/Send", {
      ...getToken(),
      ...data,
    });
    return result.data;
  } catch (e) {
    store.dispatch(callError("Произошла непредвиденная ошибка"));
    throw e;
  }
}
