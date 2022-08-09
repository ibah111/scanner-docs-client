import { Type } from "class-transformer";
import { Depart } from "./Depart.model";
import { Transmit } from "./Transmit.model";
import { User } from "./User.model";

export class Doc {
  id: number;
  title: string;
  contact_doc_id: number;
  mail_id: number;
  law_act_id: number;
  law_exec_id: number;
  page: number;
  pageSize: number;
  @Type(() => Date)
  date: Date;
  @Type(() => User)
  User: User;
  @Type(() => Depart)
  Depart: Depart;
  @Type(() => Transmit)
  Transmits: Transmit[];
}
