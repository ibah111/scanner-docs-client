import { Barcode } from "./Barcode.model";

export class Doc {
  id: number;
  title: string;
  contact_doc_id: number;
  mail_id: number;
  law_act_id: number;
  law_exec_id: number;
  date: Date;
  Barcode: Barcode;
}
