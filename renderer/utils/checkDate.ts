import { TypesData } from '../ReducerSend/Send';
import { DateTime } from 'luxon';

export default function checkDate(value: TypesData, availableEmpty = false) {
  if (value === null) {
    if (!availableEmpty) {
      return 'empty';
    }
  } else {
    if ((value as DateTime).isValid) {
      return null;
    } else {
      return 'invalid_date';
    }
  }
}
