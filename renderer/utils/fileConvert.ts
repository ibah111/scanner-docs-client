import { File } from '../Schemas/File.model';
import mime from 'mime-types';

function toArrayBuffer(buf: number[]) {
  const ab = new ArrayBuffer(buf.length);
  const view = new Uint8Array(ab);
  for (let i = 0; i < buf.length; ++i) {
    view[i] = buf[i];
  }
  return ab;
}
export function changeMime(name: string, value: Blob) {
  const type = mime.lookup(name) as string;
  const file = new Blob([value], {
    type,
  });
  return file;
}
export default function fileConvert(value: File) {
  const type = mime.lookup(value.name) as string;
  const file = new Blob([toArrayBuffer(value.data.data)], {
    type,
  });
  return file;
}
