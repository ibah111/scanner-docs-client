import moment from 'moment';
import { Doc } from '../../Schemas/Doc.model';
import { generateName } from '../../utils/generateName';
import OpenDocuments from './OpenDocuments';
import { GridColDef } from '@mui/x-data-grid-premium';

export const DocColumns: GridColDef<Doc>[] = [
  {
    field: 'Doc.id',
    headerName: '№',
    valueGetter: (params) => {
      return params.row.id;
    },
    width: 5,
  },
  {
    field: 'Barcode.code',
    headerName: 'Номер штрихкода',
    valueGetter(params) {
      return params.row.Barcode.code;
    },
    width: 130,
  },
  {
    field: 'BoxType.title',
    headerName: 'Короб',
    valueGetter(params) {
      return params.row.Barcode.BoxType.title || 'Не в коробе';
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
    field: 'DocData.Result.kd',
    headerName: 'Кредитный договор',
    valueGetter: (params) => {
      return params.row?.DocData.Result.kd;
    },
    width: 200,
  },
  {
    field: 'DocData.Result.reestr',
    headerName: 'Реестр',
    valueGetter: (params) => {
      return params.row?.DocData.Result.reestr;
    },
    width: 200,
  },
  {
    field: 'DocData.Result.fio_dol',
    headerName: 'ФИО должника',
    valueGetter: (params) => {
      return params.row?.DocData.Result.fio_dol;
    },
    width: 200,
  },
  {
    field: 'Doc.title',
    headerName: 'Название документа',
    valueGetter: (params) => {
      return params.row?.title;
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
  {
    field: 'DocData.User.f',
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
    field: 'DocData.Depart.title',
    headerName: 'Подразделение',
    valueGetter: (params) => {
      return params.row.DocData.Depart?.title;
    },
    width: 200,
  },
  {
    field: 'DocData.Transmits.date_send',
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
    field: 'DocData.Transmits.where_send',
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
    description: 'Приказ, иск, правопреемство, банкротство',
    valueGetter(params) {
      return params.row.law_act_id;
    },
    width: 150,
  },
  {
    field: 'law_exec_id',
    headerName: 'Исполнительное производство',
    valueGetter: (params) => {
      return params.row.law_exec_id;
    },
    width: 200,
  },
];
