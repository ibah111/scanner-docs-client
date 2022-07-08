import { Type } from "class-transformer";

export class Transmit {
  id: number;
  barcode: number;
  @Type(() => Date)
  date_send: Date;
  where_send: string;
  @Type(() => Date)
  date_return: Date;
}
