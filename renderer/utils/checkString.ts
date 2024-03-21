import { TypesData } from '../Reducer/Send';

export default function checkString(value: TypesData, availableEmpty: boolean) {
  if (availableEmpty) return null;
  if (!value) {
    return 'empty';
  } else {
    return null;
  }
}
