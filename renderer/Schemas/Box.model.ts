import { Type } from 'class-transformer';
import { BarcodeTypes } from './BarcodeTypes.model';
import { Depart } from './Depart.model';
import { Doc } from './Doc.model';
import { User } from './User.model';

export class Box {
  id: number;
  @Type(() => BarcodeTypes)
  BarcodeTypes: BarcodeTypes;
  @Type(() => Doc)
  Doc: Doc[];
  @Type(() => User)
  User: User;
  @Type(() => Depart)
  Depart: Depart;
}
