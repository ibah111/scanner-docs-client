import { Type } from 'class-transformer';
import { Depart } from './Depart.model';
import { Doc } from './Doc.model';
import { Log } from './Log.model';
import { Result } from './Result.model';
import { Status } from './Status.model';
import { Transmit } from './Transmit.model';
import { User } from './User.model';

export class DocData {
  id: number;
  @Type(() => Doc)
  Doc: Doc;
  @Type(() => Status)
  Status: Status;
  @Type(() => User)
  User: User;
  @Type(() => User)
  UserOld: User;
  @Type(() => Depart)
  Depart: Depart;
  @Type(() => Depart)
  DepartOld: Depart;
  @Type(() => Transmit)
  Transmits: Transmit[];
  @Type(() => Result)
  doc: Result;

  @Type(() => Log)
  Logs: Log;
}
