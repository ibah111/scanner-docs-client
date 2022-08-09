import axios, { AxiosError } from "axios";
import { DocsState } from "../Reducer/Docs";
import { getToken } from "../utils/getToken";
import server from "../utils/server";

export default async function getDocs(
  title: string,
  contact_doc_id: number,
  law_act_id: number,
  page: number,
  pageSize: number
) {
  try {
    const result = await axios.post<DocsState>(server() + "/getDocs", {
      ...getToken(),
      title,
      contact_doc_id,
      law_act_id,
      page,
      pageSize,
    });
    console.log(result.data);
    return result.data;
  } catch (e) {
    if (e instanceof AxiosError) {
    }
    throw e;
  }
}
