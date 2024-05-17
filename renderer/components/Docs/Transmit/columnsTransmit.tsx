import { GridColDef } from '@mui/x-data-grid-premium';
import moment from 'moment';
import { Log } from '../../../Schemas/Log.model';
import { generateName } from '../../../utils/generateName';
import { disableGridUtils } from '../../../utils/disableGridUtils';
export default function columnsTransmit(): GridColDef<Log>[] {
  const columnsTransmit: GridColDef<Log>[] = [
    {
      field: 'id',
      headerName: 'ID Лога',
      valueGetter(params) {
        return params.row.id;
      },
    },
    {
      field: 'date',
      type: 'date',
      headerName: 'Дата лога',
      valueGetter(params) {
        return moment(params.row.date).toDate();
      },
    },
    {
      ...disableGridUtils,
      field: 'time',
      headerName: 'Время',
      renderCell(params) {
        const date = moment(params.row.date).toDate();
        const time = date.getHours() + ':' + date.getMinutes();
        return <>{time}</>;
      },
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
      field: 'where_send',
      headerName: 'Куда отправлено',
      valueGetter: (params) => {
        return params.row.Transmit?.where_send || '';
      },
      width: 200,
    },
    {
      field: 'sender',
      headerName: 'Кем сгенерирован лог',
      width: 200,
      valueGetter: (params) => {
        return generateName(
          params.row.User.f,
          params.row.User.i,
          params.row.User.o,
        );
      },
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
