import { ValidationError } from "class-validator";
import { t } from "i18next";
import { TranslateMessage } from "./checker";

export default function helperCheck(
  errors: ValidationError[],
  name: string
): string {
  if (errors.length > 0) {
    const error = errors.find((error) => error.property === name);
    if (!error) return "";
    for (const key of Object.keys(error.constraints!)) {
      if (error.constraints![key].startsWith("{")) {
        const data: TranslateMessage = JSON.parse(error.constraints![key]);
        return t(`form.errors.${data.name}`, {
          value: error.value,
          property: error.property,
          ...data.options,
        });
      }
      return t(`form.errors.${error.constraints![key]}`, {
        value: error.value,
        property: error.property,
      });
    }
  }
  return "";
}
