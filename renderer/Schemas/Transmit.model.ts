import { Type } from "class-transformer";
import { Barcode } from "./Barcode.model";

export class Transmit {
  id: number;
  barcode: number;
  @Type(() => Date)
  date_send: Date;
  where_send: string;
  active: boolean;
  @Type(() => Date)
  date_return: Date;
  @Type(() => Barcode)
  Barcode: Barcode;
}
