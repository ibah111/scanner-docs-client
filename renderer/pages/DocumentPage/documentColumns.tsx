import moment from 'moment';
import { Doc } from '../../Schemas/Doc.model';
import { generateName } from '../../utils/generateName';
import { GridColDef } from '@mui/x-data-grid-premium';
import OpenDocuments from '../../components/Docs/OpenDocuments';

export default function documentColumns() {
  const documentColumns: GridColDef<Doc>[] = [
    {
      field: 'id',
      type: 'number',
      headerName: '№',
      valueGetter: (params) => {
        return params.row.id;
      },
      width: 5,
    },
    {
      field: 'title',
      headerName: 'Название документа',
      valueGetter: (params) => {
        return params.row?.title;
      },
      type: 'string',
      width: 200,
    },
    {
      field: 'code',
      headerName: 'Номер штрихкода',
      valueGetter(params) {
        return params.row.Barcode?.code;
      },
      width: 130,
    },
    {
      field: 'contact_doc_id',
      headerName: 'Номер документа',
      valueGetter: (params) => {
        return params.row?.contact_doc_id;
      },
      width: 120,
    },
    {
      field: 'kd',
      headerName: 'Кредитный договор',
      valueGetter: (params) => {
        return params.row?.DocData.Result.kd;
      },
      width: 200,
    },
    {
      field: 'reestr',
      headerName: 'Реестр',
      valueGetter: (params) => {
        return params.row?.DocData.Result.reestr;
      },
      width: 200,
    },
    {
      field: 'fio_dol',
      headerName: 'ФИО должника',
      valueGetter: (params) => {
        return params.row?.DocData.Result.fio_dol;
      },
      width: 200,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Документ',
      getActions: (params) => [
        <OpenDocuments
          key={1}
          id={Number(params.row.contact_doc_id)}
          title={params.row.title}
        />,
      ],
      width: 50,
    },
    /**
     * @todo sequelize server concat
     */
    {
      field: 'fio',
      headerName: 'Текущий держатель',
      valueGetter: (params) => {
        return generateName(
          params.row.DocData.User?.f,
          params.row.DocData.User?.i,
          params.row.DocData.User?.o,
        );
      },
      width: 200,
    },
    {
      field: 'title',
      headerName: 'Подразделение',
      valueGetter: (params) => {
        return params.row.DocData.Depart?.title;
      },
      width: 200,
    },
    {
      field: 'date_send',
      headerName: 'Дата отправки в банк/ОСП',
      valueGetter: (params) => {
        if (params.row.DocData.Transmits?.length > 0) {
          return moment(params.row.DocData.Transmits[0]?.date_send)
            .utc()
            .toDate();
        }
      },
      type: 'date',
      width: 200,
    },
    {
      field: 'where_send',
      headerName: 'Куда отправлено',
      valueGetter: (params) => {
        if (params.row.DocData.Transmits?.length > 0) {
          return params.row.DocData?.Transmits[0]?.where_send;
        }
      },
      width: 200,
    },
    {
      field: 'law_act_id',
      headerName: 'Юридическое дело',
      valueGetter(params) {
        return params.row.law_act_id;
      },
      width: 150,
    },
    {
      field: 'law_exec_id',
      headerName: 'Исполнительное дело',
      valueGetter: (params) => {
        return params.row.law_exec_id;
      },
      width: 200,
    },
  ];
  return documentColumns;
}
