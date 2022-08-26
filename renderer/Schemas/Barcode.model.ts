import { Type } from "class-transformer";
import { Depart } from "./Depart.model";
import { Doc } from "./Doc.model";
import { Result } from "./Result.model";
import { Transmit } from "./Transmit.model";
import { User } from "./User.model";
import { File } from "./File.model";
import { Log } from "./Log.model";

export class Barcode {
  id: number;
  code: string;
  doc_id: number;
  @Type(() => Doc)
  Doc: Doc;
  status: number;
  @Type(() => User)
  User: User;
  @Type(() => User)
  UserOld: User;
  @Type(() => Depart)
  Depart: Depart;
  @Type(() => Depart)
  DepartOld: Depart;
  @Type(() => Result)
  doc: Result;
  @Type(() => Transmit)
  Transmits: Transmit[];
  @Type(() => File)
  file: File;
  @Type(() => Log)
  Log: Log;
}
