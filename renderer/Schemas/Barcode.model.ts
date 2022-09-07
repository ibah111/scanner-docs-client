import { Type } from 'class-transformer';
import { BarcodeTypes } from './BarcodeTypes.model';
import { Depart } from './Depart.model';
import { Doc } from './Doc.model';
import { Result } from './Result.model';
import { User } from './User.model';

export class Barcode {
  id: number;
  code: string;
  @Type(() => Doc)
  Doc: Doc;
  @Type(() => BarcodeTypes)
  type: BarcodeTypes;
  @Type(() => File)
  file: File;
  @Type(() => Result)
  doc: Result;
  @Type(() => Depart)
  DepartOld: Depart;
  @Type(() => User)
  UserOld: User;
}
