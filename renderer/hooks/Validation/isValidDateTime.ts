import { Transform, TransformFnParams, Type } from 'class-transformer';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { DateTime } from 'luxon';
export const TransformerDateTime = ({ value }: TransformFnParams) => {
  if (value === null) return null;
  if (DateTime.isDateTime(value)) return value;
  if (typeof value === 'string') return DateTime.fromISO(value);
  if (value instanceof Date) return DateTime.fromJSDate(value);
};
export function TransformDateTime() {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return (target: Object, propertyKey: string | symbol) => {
    Type(() => Date)(target, propertyKey);
    Transform(TransformerDateTime, { toClassOnly: true })(target, propertyKey);
  };
}
@ValidatorConstraint({ name: 'isValidDateTime' })
export class IsValidDateTimeConstructor
  implements ValidatorConstraintInterface
{
  validate(value: DateTime): boolean {
    return value?.isValid;
  }
  defaultMessage(): string {
    return `This data '($value)' not valid Date`;
  }
}
export function IsValidDateTime(validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isValidDateTime',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsValidDateTimeConstructor,
    });
  };
}
