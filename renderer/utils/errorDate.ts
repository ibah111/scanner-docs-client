import moment from "moment";

export default function ErrorDate(value: string): string {
  if (!value) {
    return "Заполните дату";
  }
  if (value) {
    if (!moment(value).isValid()) {
      return "Дата заполнена неправильно";
    }
  }
  return "";
}
