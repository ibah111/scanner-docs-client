import { validateSync } from 'class-validator';

export function requiredCheck<T extends object>(
  data: T,
  name: string,
): boolean {
  const errors = validateSync(data, {
    skipUndefinedProperties: true,
  });
  if (errors.length > 0) {
    if (
      errors.find((error) => error.property === name)?.constraints?.isNotEmpty
    )
      return true;
  }
  return false;
}
export function requiredCheckSend<T extends object>(data: T): boolean {
  const errors = validateSync(data, {
    skipUndefinedProperties: true,
  });
  if (errors.length > 0) if (errors[0].constraints?.isNotEmpty) return true;
  return false;
}
