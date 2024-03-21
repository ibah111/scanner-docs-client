import { TypesData } from '../ReducerSend/Send';

export default function checkNumber(
  value: TypesData,
  availableEmpty: boolean = false,
  availableZero: boolean = false,
) {
  if (availableEmpty) {
    return null;
  }
  if (value === undefined || value === null || value === '') {
    return 'empty';
  } else {
    if (value === 0 && availableZero === false) {
      return 'number_0';
    } else {
      return null;
    }
  }
}
