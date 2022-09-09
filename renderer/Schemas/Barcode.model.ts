import { Type } from 'class-transformer';
import { Box } from './Box.model';
import { Depart } from './Depart.model';
import { Doc } from './Doc.model';
import { DocData } from './DocData.model';
import { Result } from './Result.model';
import { User } from './User.model';

export class Barcode {
  id: number;
  code: string;
  @Type(() => Box)
  Box: Box;
  @Type(() => Doc)
  Doc: Doc;
  @Type(() => Result)
  doc: Result;
  @Type(() => File)
  file: File;
  @Type(() => Depart)
  DepartOld: Depart;
  @Type(() => User)
  UserOld: User;
  @Type(() => DocData)
  DocData: DocData;
}
