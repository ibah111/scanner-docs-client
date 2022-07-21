import axios, { AxiosError } from "axios";
import { store } from "../Reducer";
import { callError } from "../Reducer/Message";
import { Barcode } from "../Schemas/Barcode.model";
import { getToken } from "../utils/getToken";
import server from "../utils/server";
export default async function getData(code: string): Promise<Barcode> {
  try {
    const result = await axios.post<Barcode>(server() + "/data", {
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
