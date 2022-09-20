import { Type } from 'class-transformer';
import { Depart } from './Depart.model';
import { Doc } from './Doc.model';
import { Log } from './Log.model';
import { Result } from './Result.model';
import { Results } from './Results.model';
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
  @Type(() => Depart)
  Depart: Depart;
  @Type(() => Transmit)
  Transmits: Transmit[];
  @Type(() => Result)
  doc: Result;
  @Type(() => Log)
  Logs: Log;
  @Type(() => File)
  file: File;
  @Type(() => Results)
  Result: Results;
  @Type(() => Depart)
  DepartOld: Depart;
  @Type(() => User)
  UserOld: User;
}
