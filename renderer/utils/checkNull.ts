import { TypesData } from '../ReducerSend/Send';

export default function checkNull(value: TypesData) {
  if (!value) {
    return 'empty';
  } else {
    return null;
  }
}
