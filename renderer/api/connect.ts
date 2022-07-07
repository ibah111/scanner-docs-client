import axios from "axios";
import { Barcode } from "../Schemas/Barcode.model";
import { getToken } from "../utils/getToken";
import server from "../utils/server";

export const getData = async (code: string) => {
  const Data = await axios.post<Barcode>(server() + "/data", {
    ...getToken(),
    code,
  });
  return Data.data;
};
