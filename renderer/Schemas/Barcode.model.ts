import { Doc } from "./Doc.model";
import { Result } from "./Result.model";

export class Barcode {
  id: number;
  code: string;
  doc_id: number;
  Doc: Doc;
  status: number;
  user: number;
  depart: number;
  doc: Result;
}
