import { session } from 'electron';
import path from 'path';

export default async function connect_bpac() {
  console.log('not_installed');
  const extension = path.join(process.cwd(), 'extensions', 'bpac');
  console.log(extension);
  try {
    const data = await session.defaultSession.loadExtension(extension);
    console.log('installing');
  } catch (e) {
    console.log(e);
  }
}
