import axios, { AxiosError } from "axios";
import { store } from "../Reducer";
import { DocsState } from "../Reducer/Docs";
import { getToken } from "../utils/getToken";
import server from "../utils/server";

export default async function getDocs() {
  const data = store.getState().DocsComponent;
  try {
    const result = await axios.post<DocsState>(server() + "/getDocs", {
      ...getToken(),
      ...data,
    });
    console.log(result.data);
    return result.data;
  } catch (e) {
    if (e instanceof AxiosError) {
    }
    throw e;
  }
}
