import { Type } from 'class-transformer';
import { BarcodeTypes } from './BarcodeTypes.model';
import { Doc } from './Doc.model';

export class Box {
  id: number;
  @Type(() => BarcodeTypes)
  BarcodeTypes: BarcodeTypes;
  @Type(() => Doc)
  Doc: Doc[];
}
