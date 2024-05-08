import { Type } from 'class-transformer';
import { Barcode } from './Barcode.model';
import { Box } from './Box.model';
import { DocData } from './DocData.model';
import { DocTypes } from './DocTypes.model';
import { Default, Model } from '@sql-tools/sequelize-typescript';
import moment from 'moment';
import { CreateLiteralAssociation } from '@sql-tools/association-literal';
import { InferAttributes, InferCreationAttributes } from '@sql-tools/sequelize';
import { BoxTypes } from './BoxTypes.model';

export class Doc extends Model<
  InferAttributes<Doc>,
  InferCreationAttributes<Doc>,
  CreateLiteralAssociation<Doc>
> {
  title: string;
  contact_doc_id: number;
  mail_id: number;
  law_act_id: number;
  law_exec_id: number;

  @Default(moment())
  @Type(() => Date)
  date?: Date;

  @Type(() => DocTypes)
  doc_type: number;

  @Type(() => DocData)
  DocData: DocData;

  @Type(() => Barcode)
  Barcode: Barcode;

  @Type(() => Box)
  Box: Box;

  @Type(() => BoxTypes)
  BoxType: BoxTypes;
}
