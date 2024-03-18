import { DateTime } from 'luxon';

export default function datetimeNow() {
  return DateTime.local({ zone: 'system' }).toUTC(0, { keepLocalTime: true });
}
