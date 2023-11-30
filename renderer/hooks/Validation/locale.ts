import {
  IsBoolean as IsBooleanOrigin,
  IsNotEmpty as IsNotEmptyOrigin,
  IsEmail as IsEmailOrigin,
  IsNumber as IsNumberOrigin,
  Length as LengthOrigin,
  IsPositive as IsPositiveOrigin,
  ValidationOptions,
  IsNumberOptions,
} from "class-validator";
import ValidatorJS from "validator";
import { IsValidMoment as IsValidMomentOrigin } from "./IsValidMoment";
import { DateRange as DateRangeOrigin, DateRangeOptions } from "./DateRange";
import { TranslateMessage } from "./checker";

export const IsPositive = (validationOptions?: ValidationOptions) =>
  IsPositiveOrigin({ message: "IsPositive", ...validationOptions });

export const IsBoolean = (validationOptions?: ValidationOptions) =>
  IsBooleanOrigin({ message: "isBoolean", ...validationOptions });

export const IsNotEmpty = (validationOptions?: ValidationOptions) =>
  IsNotEmptyOrigin({ message: "isNotEmpty", ...validationOptions });

export const IsEmail = (
  options?: ValidatorJS.IsEmailOptions,
  validationOptions?: ValidationOptions
) => IsEmailOrigin(options, { message: "isEmail", ...validationOptions });

export const IsNumber = (
  options: IsNumberOptions = {},
  validationOptions?: ValidationOptions
) => IsNumberOrigin(options, { message: "isNumber", ...validationOptions });

export const Length = (
  min: number,
  max?: number,
  validationOptions?: ValidationOptions
) =>
  LengthOrigin(min, max, {
    message: (args) => {
      const result = `{"name":"$name","options":{"constraint1":$constraint1,"constraint2":$constraint2}}`;
      const isMinLength =
        args?.constraints[0] !== null && args?.constraints[0] !== undefined;
      const isMaxLength =
        args?.constraints[1] !== null && args?.constraints[1] !== undefined;
      if (
        isMinLength &&
        (!args.value || args.value.length < args?.constraints[0])
      ) {
        return result.replace("$name", "length>=");
      } else if (isMaxLength && args.value.length > args?.constraints[1]) {
        return result.replace("$name", "length<=");
      }
      return result.replace("$name", "length<>");
    },
    ...validationOptions,
  });

export const IsValidMoment = (validationOptions?: ValidationOptions) =>
  IsValidMomentOrigin({ message: "isValidMoment", ...validationOptions });

export const DateRange = (
  options: DateRangeOptions,
  validationOptions?: ValidationOptions
) =>
  DateRangeOrigin(options, {
    message: (args) => {
      const result = args.constraints[1];
      let message: TranslateMessage | null = null;
      switch (result) {
        case "invalidOptions":
          message = { name: "DateRangeOptionsInvalid", options: {} };
          break;
        case "maxDate":
          message = {
            name: "DateRangeAfterMax",
            options: {
              maxDate: options?.maxDate?.format("DD.MM.YYYY") || null,
            },
          };
          break;
        case "minDate":
          message = {
            name: "DateRangeBeforeMin",
            options: {
              minDate: options?.minDate?.format("DD.MM.YYYY") || null,
            },
          };
          break;
      }
      return JSON.stringify(message);
    },
    ...validationOptions,
  });
