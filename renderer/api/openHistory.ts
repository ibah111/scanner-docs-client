import axios, { AxiosError } from "axios";
import { store } from "../Reducer";
import { callError } from "../Reducer/Message";
import { Transmit } from "../Schemas/Transmit.model";
import { getToken } from "../utils/getToken";
import server from "../utils/server";

export default async function openHistory(code: number) {
  try {
    const result = await axios.post<Transmit[]>(server() + "/openHistory", {
      ...getToken(),
      code,
    });
    return result.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      store.dispatch(callError(e.response.data.message));
    }
    throw e;
  }
}
