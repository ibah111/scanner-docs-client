import axios, { AxiosError } from "axios";
import { store } from "../Reducer";
import { callError } from "../Reducer/Message";
import { getToken } from "../utils/getToken";
import server from "../utils/server";
import mime from "mime-types";
function toArrayBuffer(buf: number[]) {
  const ab = new ArrayBuffer(buf.length);
  const view = new Uint8Array(ab);
  for (let i = 0; i < buf.length; ++i) {
    view[i] = buf[i];
  }
  return ab;
}
function toFile(value: { name: string; data: number[] }) {
  const type = mime.lookup(value.name) as string;
  const file = new Blob([toArrayBuffer(value.data)], {
    type,
  });
  return file;
}
export default async function getData(code: string) {
  try {
    const result = await axios.post(server() + "/data", {
      ...getToken(),
      code,
    });
    console.log(result.data);
    return result.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      store.dispatch(callError(e.response.data.message));
    }
    throw e;
  }
}
