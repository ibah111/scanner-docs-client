import { Type } from 'class-transformer';
import { Barcode } from './Barcode.model';
import { Depart } from './Depart.model';
import { Result } from './Result.model';
import { Status } from './Status.model';
import { Transmit } from './Transmit.model';
import { User } from './User.model';

export class Log {
  id: number;

  @Type(() => User)
  User: User;

  @Type(() => Barcode)
  Barcode: Barcode;

  @Type(() => Depart)
  Depart: Depart;

  @Type(() => Transmit)
  Transmit?: Transmit;

  @Type(() => Result)
  doc: Result;

  date: Date;

  @Type(() => Status)
  Status: Status;
}
