import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import errorCheck, { errorCheckSend } from './errorCheck';
import helperCheck, { helperCheckSend } from './helperCheck';
import { requiredCheck, requiredCheckSend } from './requiredCheck';

interface CheckerResult {
  required: boolean;
  error: boolean;
  helperText: string;
}

export class TranslateOptions {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [index: string]: any;
}

export class TranslateMessage {
  name: string;
  options: TranslateOptions = {};
}

export default function checker<T extends object, F>(
  example: ClassConstructor<T>,
  name: keyof T,
  value: F,
  additional?: T,
): CheckerResult {
  const result: CheckerResult = {
    required: false,
    error: false,
    helperText: '',
  };
  const dataNull = plainToInstance(example, { [name]: null });
  const data = plainToInstance(
    example,
    {
      [name]:
        value === undefined || value === null || value === '' ? null : value,
      ...(additional || {}),
    },
    { enableImplicitConversion: true },
  );
  result.required = requiredCheck(dataNull, name as string);
  const errors = validateSync(data, { skipUndefinedProperties: true });
  result.error = errorCheck(errors, name as string);
  result.helperText = helperCheck(errors, name as string);
  return result;
}
export function checkerSend<T extends object, F>(
  example: ClassConstructor<T>,
  name: string,
  value: F,
): CheckerResult {
  const result: CheckerResult = {
    required: false,
    error: false,
    helperText: '',
  };
  const dataNull = plainToInstance(example, { [name]: null });
  const data = plainToInstance(
    example,
    {
      [name]:
        value === undefined || value === null || value === '' ? null : value,
    },
    { enableImplicitConversion: true },
  );
  result.required = requiredCheckSend(dataNull);
  const errors = validateSync(data, { skipUndefinedProperties: true });
  result.error = errorCheckSend(errors);
  result.helperText = helperCheckSend(errors);
  return result;
}
