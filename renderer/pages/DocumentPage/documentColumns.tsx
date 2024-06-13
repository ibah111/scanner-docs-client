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
import { BoxTypes } from '../../Schemas/BoxTypes.model';

export default function documentColumns(
  { EventTarget }: EventDialogInterface,
  BoxTypes: BoxTypes[],
) {
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
      valueGetter(params) {
        return params.row.title;
      },
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
      field: 'BoxType.title',
      headerName: 'Короб',
      width: 130,
      type: 'singleSelect',
      valueOptions: BoxTypes.map((item) => ({
        value: item.id,
        label: item.title,
      })),
      renderCell: (params) => {
        return params.row.Barcode?.BoxType?.title || 'Не распределен в короб';
      },
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
      field: 'doc_type',
      headerName: 'Тип дела/документа',
      valueGetter(params) {
        const types = [
          {
            id: 1,
            name: 'Судебная работа',
          },
          {
            id: 2,
            name: 'Исполнительное производство',
          },
        ];
        const doc_type = params.row.doc_type;
        const result = types.find((type) => type.id === doc_type);
        return result.name;
      },
    },

    {
      field: 'law_case_id',
      headerName: 'ID дела',
      type: 'number',
      valueGetter(params) {
        return params.row.law_case_id;
      },
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
            <OpenDocuments
              key={1}
              id={params.row.contact_doc_id}
              title={params.row.title}
            />
          </Can>
        </>,
      ],
    },
  ];
  return documentColumns;
}
