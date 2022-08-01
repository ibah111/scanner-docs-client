import axios, { AxiosError } from "axios";
import { Doc } from "../Schemas/Doc.model";
import { getToken } from "../utils/getToken";
import server from "../utils/server";

export default async function getDocs() {
  try {
    const result = await axios.post<Doc[]>(server() + "/getDocs", {
      ...getToken(),
    });
    console.log(result.data);
    return result.data;
  } catch (e) {
    if (e instanceof AxiosError) {
    }
    throw e;
  }
}
