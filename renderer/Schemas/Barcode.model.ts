import { Type } from 'class-transformer';
import { Depart } from './Depart.model';
import { Doc } from './Doc.model';
import { DocData } from './DocData.model';
import { Result } from './Result.model';
import { User } from './User.model';
import { BoxTypes } from './BoxTypes.model';

export class Barcode {
  id: number;
  code: string;
  box_type_id: number;
  @Type(() => BoxTypes)
  BoxType: BoxTypes;
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
