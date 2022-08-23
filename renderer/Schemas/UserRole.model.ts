import { Type } from "class-transformer";
import { Role } from "./Role.model";
import { User } from "./User.model";

export class User_Role {
  id: number;
  user_id: number;
  @Type(() => User)
  User: User;
  @Type(() => Role)
  Role: Role;
}
