import axios from "axios";
  import { getToken } from "../utils/getToken";
  import server from "../utils/server";
  
  export const getData = async (
    code: string, 
  ) => {
    const Data = await axios({
      url: server() + "/data",
      method: "POST",
      data: {
        ...getToken(),
        code,
      },
    });
    return Data.data;
  };
  