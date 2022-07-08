import { Depart } from "./Depart.model";
import { Doc } from "./Doc.model";
import { Result } from "./Result.model";
import { Transmit } from "./Transmit.model";
import { User } from "./User.model";

export class Barcode {
  id: number;
  code: string;
  doc_id: number;
  Doc: Doc;
  status: number;
  User: User;
  Depart: Depart;
  doc: Result;
  Transmits: Transmit[];
}
