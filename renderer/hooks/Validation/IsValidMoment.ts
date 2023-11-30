import { TransformFnParams } from "class-transformer";
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import moment from "moment";

export const NullOrMoment = ({ value }: TransformFnParams) => {
  if (value === undefined) return undefined;
  if (value === null) return null;
  if (moment.isMoment(value)) {
    const creation = value.creationData();
    if (creation.input && !value.isValid()) {
      const result = moment(creation.input, creation.format, creation.strict);
      return result;
    } else {
      return moment(value.toDate());
    }
  }
  return moment(value);
};

@ValidatorConstraint({ name: "isValidMoment" })
export class IsValidMomentConstructor implements ValidatorConstraintInterface {
  validate(value: moment.Moment): boolean {
    return value?.isValid?.();
  }
  defaultMessage(): string {
    return `This data '($value)' not valid Date`;
  }
}

export function IsValidMoment(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "isValidMoment",
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsValidMomentConstructor,
    });
  };
}
