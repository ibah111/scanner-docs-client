import axios from "axios";
import { getToken } from "../utils/getToken";
import server from "../utils/server";

export default async function addRole(id: number) {
  const Action = await axios.post<boolean>(server() + "/role" + "/addRole", {
    ...getToken(),
    id,
  });
  return Action.data;
}
