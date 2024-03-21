import { TypesData } from '../Reducer/Send';

export default function checkNull(value: TypesData) {
  if (!value) {
    return 'empty';
  } else {
    return null;
  }
}
