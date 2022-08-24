import axios, { AxiosError } from "axios";
import { store } from "../Reducer";
import { callError } from "../Reducer/Message";
import { getToken } from "../utils/getToken";
import server from "../utils/server";
export interface Role {
  id: number;
  name: string;
  title: string;
  Users_Roles: User_Role[];
}
interface User_Role {
  id: number;
  user_id: number;
  User: User;
  role_id: number;
  Role: Role;
}
export interface User {
  id: number;
  id_bitrix: number;
  login: string;
  Users_Roles: User_Role[];
}
export interface ResultRole {
  roles: Role[];
  users: User[];
}

export default async function getRoles() {
  try {
    const result = await axios.post<ResultRole>(server() + "/role" + "/get", {
      ...getToken(),
    });
    return result.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      store.dispatch(callError(e.response.data.message));
    }
    throw e;
  }
}
