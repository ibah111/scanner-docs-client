export class AuthUser<T> {
  output: T extends true ? "Вы вошли" : "Вы не вошли";
  error: T extends false ? string : never;
  id: T extends true ? number : never;
  login: T extends true ? string : never;
  login_result: T;
  birthdate: T extends true ? string : never;
  department: T extends true ? string : never;
  position: T extends true ? string : never;
  firstname: T extends true ? string : never;
  secondname: T extends true ? string : never;
  thirdname: T extends true ? string : never;
  roles: T extends true ? string[] : never;
  avatar: T extends true ? string : never;
}
export class AuthUserSuccess extends AuthUser<true> {}
export class AuthUserError extends AuthUser<false> {}
