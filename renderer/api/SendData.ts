import axios, { AxiosError } from "axios";
import { store } from "../Reducer";
import { callError, callSuccess } from "../Reducer/Message";
import { Transmit } from "../Schemas/Transmit.model";
import { getToken } from "../utils/getToken";
import server from "../utils/server";

export default async function SendData() {
  const data = store.getState().Send;
  const id = store.getState().Data.id;
  try {
    const result = await axios.post<Transmit>(server() + "/send", {
      ...getToken(),
      ...data,
      id,
    });
    store.dispatch(callSuccess("Данные успешно отправлены"));

    return result.data;
  } catch (e) {
    if (e instanceof AxiosError)
      if (e.response.status === 400) {
        if (Array.isArray(e.response.data?.message)) {
          for (const value of e.response.data.message) {
            switch (value) {
              case "DateSend should not be empty":
                store.dispatch(callError("Заполните поле: 'Дата отправки'"));
                break;
              case "DateSend must be a Date instance":
                store.dispatch(callError("Введите корректную дату"));
                break;
              case "WhereSend should not be empty":
                store.dispatch(callError("Заполните поле: 'Куда'"));
                break;
              default:
                store.dispatch(callError(value));
            }
          }
        }
      } else {
        store.dispatch(callError("Произошла непредвиденная ошибка"));
      }
    throw e;
  }
}
