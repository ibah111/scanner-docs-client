import { AbilityBuilder, PureAbility, createMongoAbility } from '@casl/ability';
import { AuthUserSuccess } from '../Schemas/Auth';

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Permit = 'permit',
  Delete = 'delete',
  Restore = 'restore',
}
export enum Subject {
  Barcode = 'Barcode',
  Box = 'Box',
  Doc = 'Doc',
  DocData = 'DocData',
}
export type Subjects = Subject | 'all';
export type AppAbility = PureAbility<[Action, Subjects]>;

export function createUserAbility(user?: AuthUserSuccess) {
  const { build, can } = new AbilityBuilder<AppAbility>(createMongoAbility);
  const roles = user?.roles;
  if (!user) return build();

  if (roles?.includes('admin')) {
    can(Action.Manage, 'all');
  }
  return build();
}
