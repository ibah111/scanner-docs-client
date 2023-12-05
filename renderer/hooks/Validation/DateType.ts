import { Type } from "class-transformer";
import moment from "moment";

export const DateType = (date?: boolean) => Type(() => (date ? Date : moment));
