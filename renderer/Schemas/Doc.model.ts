import { Type } from 'class-transformer';
import { Barcode } from './Barcode.model';
import { DocData } from './DocData.model';
import { DocTypes } from './DocTypes.model';
import { Result } from './Result.model';

export class Doc {
  id: number;
  title: string;
  contact_doc_id: number;
  mail_id: number;
  law_act_id: number;
  law_exec_id: number;
  @Type(() => Date)
  date: Date;
  @Type(() => DocTypes)
  type: DocTypes;
  @Type(() => DocData)
  DocData: DocData;
  @Type(() => Result)
  doc: Result;
  @Type(() => Barcode)
  Barcode: Barcode;
}
