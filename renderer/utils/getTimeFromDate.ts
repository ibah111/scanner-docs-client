import moment from 'moment';

export default function getTimeFromDate(value: Date): string {
  const date = moment(value).toDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  if (minutes < 10) {
    const newMin = `0${minutes}`;
    const stringTime: string = `${hours}:${newMin}`;
    return stringTime;
  }
  const stringTime: string = `${hours}:${minutes}`;
  return stringTime;
}
