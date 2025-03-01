import { ValidationError } from 'class-validator';

export default function errorCheck(
  errors: ValidationError[],
  name: string,
): boolean {
  if (errors.length > 0 && errors.find((error) => error.property === name))
    return true;
  return false;
}
export function errorCheckSend(errors: ValidationError[]): boolean {
  if (errors.length > 0) return true;
  return false;
}
