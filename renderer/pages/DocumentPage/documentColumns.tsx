import moment from 'moment';
import { Doc } from '../../Schemas/Doc.model';
import { generateName } from '../../utils/generateName';
import { GridColDef } from '@mui/x-data-grid-premium';
import OpenDocuments from '../../components/Docs/OpenDocuments';
import { Can } from '../../casl/casl.factory';
import { Action, Subject } from '../../casl/casl';
import PrintButton from './DocumentComponents/PrintButton';
import { DocumentEvents, EventDocumentDialog } from '.';
import { EventDialogInterface } from '../../utils/EventDialogInterface';

export default function documentColumns({ EventTarget }: EventDialogInterface) {
  const documentColumns: GridColDef<Doc>[] = [
    {
      field: 'id',
      type: 'number',
      headerName: '№',
      valueGetter: (params) => {
        return params.row.id;
      },
      width: 25,
    },
    {
      field: 'title',
      headerName: 'Название документа',
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
      type: 'number',
      field: 'contact_doc_id',
      headerName: 'Номер документа',
      width: 120,
      valueGetter: (params) => {
        return params.row?.contact_doc_id;
      },
    },
    {
      field: 'kd',
      headerName: 'Кредитный договор',
      valueGetter: (params) => {
        return params.row?.DocData?.Result?.kd || 'Кд не указан';
      },
      width: 200,
    },
    {
      field: 'reestr',
      headerName: 'Реестр',
      valueGetter: (params) => {
        return params.row?.DocData?.Result?.reestr || 'Реестр не указан';
      },
      width: 200,
    },
    {
      field: 'fio_dol',
      headerName: 'ФИО должника',
      valueGetter: (params) => {
        return (
          params.row?.DocData?.Result?.fio_dol || 'ФИО Должника не указано'
        );
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
      field: 'depatment',
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
      type: 'number',
      field: 'law_act_id',
      headerName: 'Юридическое дело',
      valueGetter(params) {
        return params.row.law_act_id;
      },
      width: 150,
    },
    {
      type: 'number',
      field: 'law_exec_id',
      headerName: 'Исполнительное дело',
      valueGetter: (params) => {
        return params.row.law_exec_id;
      },
      width: 200,
    },
    {
      field: 'actions',
      headerName: 'Действия',
      width: 200,
      type: 'actions',
      getActions: (params) => [
        <>
          <Can I={Action.Manage} a={Subject.Doc}>
            <PrintButton
              handleOpen={() =>
                EventTarget.dispatchEvent(
                  new EventDocumentDialog(
                    DocumentEvents.openPrintDialog,
                    params.row.id,
                    params.row.title,
                  ),
                )
              }
            />
          </Can>
        </>,
      ],
    },
  ];
  return documentColumns;
}
