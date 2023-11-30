import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from "class-validator";
import moment from "moment";

export interface DateRangeOptions {
  minDate?: moment.Moment;
  maxDate?: moment.Moment;
}

@ValidatorConstraint({ name: "DateRange" })
export class DateRangeConstructor implements ValidatorConstraintInterface {
  validate(value: moment.Moment, args: ValidationArguments): boolean {
    if (!value) return false;
    const options = args.constraints[0] as DateRangeOptions;
    let valid = false;
    if (options.minDate) {
      if (options.minDate.isBefore(value)) valid = true;
      else {
        args.constraints[1] = "minDate";
        return false;
      }
    }
    if (options.maxDate) {
      if (options.maxDate.isAfter(value)) valid = true;
      else {
        args.constraints[1] = "maxDate";
        return false;
      }
    }
    return valid;
  }
  defaultMessage(): string {
    return `Date ($value) is not in range`;
  }
}

export function DateRange(
  options: DateRangeOptions,
  validationOptions?: ValidationOptions
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "DateRange",
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: DateRangeConstructor,
      constraints: [options],
    });
  };
}
