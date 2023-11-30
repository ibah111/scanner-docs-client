import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from "class-validator";

export type ConditionFunc<T extends object, V extends keyof T> = (
  value: T[V],
  obj: T
) => boolean;

@ValidatorConstraint({ name: "condition" })
export class ConditionConstructor<T extends object, V extends keyof T>
  implements ValidatorConstraintInterface
{
  validate(value: T[V], args: ValidationArguments): boolean {
    const condition = args.constraints[0] as ConditionFunc<T, V>;
    return condition(value, args.object as T);
  }
  defaultMessage(): string {
    return `Date ($value) is not in range`;
  }
}
export function Condition<T extends object, V extends keyof T>(
  options: ConditionFunc<T, V>,
  validationOptions?: ValidationOptions
) {
  return function (object: T, propertyName: V) {
    registerDecorator({
      name: "condition",
      target: object.constructor,
      propertyName: propertyName as unknown as string,
      options: validationOptions,
      constraints: [options],
      validator: ConditionConstructor,
    });
  };
}
