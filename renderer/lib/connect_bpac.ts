import { session } from 'electron';
import path from 'path';

export default async function connect_bpac() {
  const remote = await import('@electron/remote');
  console.log('not_installed');
  const extension = path.join(remote.process.cwd(), 'extensions', 'bpac');
  console.log(extension);
  try {
    const data = await remote.session.defaultSession.loadExtension(extension);
    console.log('installing');
  } catch (e) {
    console.log(e);
  }
}
