import { GridColDef } from '@mui/x-data-grid-premium';
import moment from 'moment';
import { Log } from '../../../Schemas/Log.model';
import { generateName } from '../../../utils/generateName';
export default function columnsTransmit(): GridColDef<Log>[] {
  const columnsTransmit: GridColDef<Log>[] = [
    {
      field: 'date_send',
      headerName: 'Дата отправки в банк/ОСП',
      valueGetter: (params) => {
        return moment(params.row.Transmit?.date_send).toDate() || '';
      },
      type: 'date',
      width: 200,
    },
    {
      field: 'where_send',
      headerName: 'Куда отправлено',
      valueGetter: (params) => {
        return params.row.Transmit?.where_send || '';
      },
      width: 200,
    },
    {
      field: 'sender',
      headerName: 'Пользователь',
      valueGetter: (params) => {
        return generateName(
          params.row.User.f,
          params.row.User.i,
          params.row.User.o,
        );
      },
      width: 200,
    },
    {
      field: 'depart',
      headerName: 'Подразделение',
      valueGetter: (params) => {
        return params.row.Depart.title;
      },
      width: 200,
    },
    {
      field: 'status',
      headerName: 'Статус',
      valueGetter: (params) => {
        return params.row.Status.title;
      },
      width: 200,
    },
    {
      type: 'date',
      field: 'date_return',
      headerName: 'Дата возврата',
      valueGetter: (params) => {
        if (params.row.Transmit?.date_return !== null)
          return moment(params.row.Transmit?.date_return).toDate();
        else return '';
      },
      width: 200,
    },
  ];
  return columnsTransmit.map((item) => ({
    ...item,
    headerAlign: 'center',
    align: 'center',
  }));
}
