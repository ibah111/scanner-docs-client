import axios, { AxiosError } from "axios";
import { store } from "../Reducer";
import { callError } from "../Reducer/Message";
import { User_Role } from "../Schemas/UserRole.model";
import { getToken } from "../utils/getToken";
import server from "../utils/server";

export default async function getRoles() {
  try {
    const result = await axios.post<User_Role[]>(server() + "/role" + "/get", {
      ...getToken(),
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
