import { GridColumns } from "@mui/x-data-grid-premium";
import moment from "moment";
import { Doc } from "../../Schemas/Doc.model";
import { generateName } from "../../utils/generateName";
import OpenDocuments from "./OpenDocuments";

const columns: GridColumns<Doc> = [
  {
    field: "id",
    headerName: "№",
    width: 5,
  },
  {
    field: "contact_doc_id",
    headerName: "Номер документа",
    valueGetter: (params) => {
      return params.row?.contact_doc_id;
    },
    width: 150,
  },
  {
    field: "title",
    headerName: "Название документа",
    valueGetter: (params) => {
      return params.row?.title;
    },
    width: 350,
  },
  {
    field: "actions",
    type: "actions",
    headerName: "Документ",
    getActions: (params) => [
      <OpenDocuments
        key={1}
        id={Number(params.row.contact_doc_id)}
        title={params.row?.title}
      />,
    ],
    width: 50,
  },
  {
    field: "fio",
    headerName: "Текущий держатель",
    valueGetter: (params) => {
      return generateName(
        params.row.Barcode.User.f,
        params.row.Barcode.User.i,
        params.row.Barcode.User.o
      );
    },
    width: 200,
  },
  {
    field: "depart",
    headerName: "Подразделение",
    valueGetter: (params) => {
      return params.row.Barcode.Depart.title;
    },
    width: 200,
  },
  {
    field: "date_send",
    headerName: "Дата отправки в банк/ОСП",
    valueGetter: (params) => {
      if (params.row.Barcode.Transmits.length > 0) {
        return moment(
          params.row.Barcode.Transmits[params.row.Barcode.Transmits.length - 1]
            .date_send
        ).toDate();
      }
    },
    type: "dateTime",
    width: 200,
  },
  {
    field: "where_send",
    headerName: "Куда отправлено",
    valueGetter: (params) => {
      if (params.row.Barcode.Transmits.length > 0) {
        return params.row.Barcode.Transmits[
          params.row.Barcode.Transmits.length - 1
        ].where_send;
      }
    },
    width: 200,
  },
  {
    field: "fio_old",
    headerName: "Предыдущий держатель",
    valueGetter: (params) => {
      return generateName(
        params.row.Barcode.UserOld?.f,
        params.row.Barcode.UserOld?.i,
        params.row.Barcode.UserOld?.o
      );
    },
    width: 200,
  },
  {
    field: "depart_old",
    headerName: "Предыдущее подразделение",
    valueGetter: (params) => {
      return params.row.Barcode.DepartOld?.title;
    },
    width: 200,
  },
];

export default columns;
