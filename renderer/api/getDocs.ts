import axios, { AxiosError } from "axios";
import { Doc } from "../Schemas/Doc.model";
import { getToken } from "../utils/getToken";
import server from "../utils/server";

export default async function getDocs(
  title: string,
  contact_doc_id: number,
  law_act_id: number
) {
  try {
    const result = await axios.post<Doc[]>(server() + "/getDocs", {
      ...getToken(),
      title,
      contact_doc_id,
      law_act_id,
    });
    console.log(result.data);
    return result.data;
  } catch (e) {
    if (e instanceof AxiosError) {
    }
    throw e;
  }
}
