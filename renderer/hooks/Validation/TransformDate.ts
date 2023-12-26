import { Transform, TransformFnParams } from 'class-transformer';
import { NullOrMoment } from './IsValidMoment';

export const TransformDate = (date?: boolean) =>
  Transform(date ? ({ value }: TransformFnParams) => value : NullOrMoment, {
    toClassOnly: true,
  });
