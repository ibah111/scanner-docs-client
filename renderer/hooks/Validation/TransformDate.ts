import { Transform, TransformFnParams } from "class-transformer";
import { NullOrMoment } from "../../Hooks/Validation/IsValidMoment";

export const TransformDate = (date?: boolean) =>
  Transform(date ? ({ value }: TransformFnParams) => value : NullOrMoment, {
    toClassOnly: true,
  });
