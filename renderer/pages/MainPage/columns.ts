import { GridColumns } from "@mui/x-data-grid";
import { Barcode } from "../../Schemas/Barcode.model";

const columns: GridColumns<Barcode> = [
  {
    field: "id",
    headerName: "№",
    width: 5,
    editable: true,
  },
  {
    field: "date_post",
    headerName: "Дата поступления",
    valueGetter: (params) => {
      return params.row.doc.date_post;
    },
    width: 200,
    editable: true,
  },
  {
    field: "st_pnkt",
    headerName: "Статья и пункт",
    valueGetter: (params) => {
      return params.row.doc.st_pnkt;
    },
    width: 130,
    editable: true,
  },
  {
    field: "kd",
    headerName: "КД",
    valueGetter: (params) => {
      return params.row.doc.kd;
    },
    width: 200,
    editable: true,
  },
  {
    field: "reestr",
    headerName: "Реестр",
    valueGetter: (params) => {
      return params.row.doc.reestr;
    },
    width: 200,
    editable: true,
  },
  {
    field: "fio_dol",
    headerName: "ФИО должника",
    valueGetter: (params) => {
      return params.row.doc.fio_dol;
    },
    width: 200,
    editable: true,
  },
  {
    field: "fio",
    headerName: "Текущий держатель",
    valueGetter: (params) => {
      return params.row.User.f + " " + params.row.User.i;
    },
    width: 200,
    editable: true,
  },
  {
    field: "title",
    headerName: "Департамент",
    valueGetter: (params) => {
      return params.row.Depart.title;
    },
    width: 200,
    editable: true,
  },
  {
    field: "where_send",
    headerName: "Дата отправки в банк/ОСП",
    valueGetter: (params) => {
      if (params.row.Transmits.length > 0) {
        params.row.Transmits[0].date_send;
      }
    },
    width: 200,
    editable: true,
  },
  {
    field: "whereSend",
    headerName: "Куда отправлено",
    valueGetter: (params) => {
      if (params.row.Transmits.length > 0) {
        params.row.Transmits[0].where_send;
      }
    },
    width: 200,
    editable: true,
  },
];

export default columns;
