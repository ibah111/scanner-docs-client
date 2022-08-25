import { GridColumns } from "@mui/x-data-grid-premium";
import moment from "moment";
import { Barcode } from "../../Schemas/Barcode.model";
import { generateName } from "../../utils/generateName";
import OpenDoc from "./openDoc";

const columns: GridColumns<Barcode> = [
  {
    field: "id",
    headerName: "№",
    width: 5,
  },
  {
    field: "actions",
    headerName: "Документ",
    type: "actions",
    getActions: () => {
      return [<OpenDoc key={0} />];
    },
  },
  {
    field: "date_post",
    headerName: "Дата поступления",
    valueGetter: (params) => {
      return moment(params.row.doc.date_post).toDate();
    },
    type: "dateTime",
    width: 200,
  },
  {
    field: "st_pnkt",
    headerName: "Статья и пункт",
    valueGetter: (params) => {
      return params.row.doc.st_pnkt;
    },
    width: 130,
  },
  {
    field: "kd",
    headerName: "КД",
    valueGetter: (params) => {
      return params.row.doc.kd;
    },
    width: 200,
  },
  {
    field: "reestr",
    headerName: "Реестр",
    valueGetter: (params) => {
      return params.row.doc.reestr;
    },
    width: 200,
  },
  {
    field: "fio_dol",
    headerName: "ФИО должника",
    valueGetter: (params) => {
      return params.row.doc.fio_dol;
    },
    width: 200,
  },
  {
    field: "fio",
    headerName: "Текущий держатель",
    valueGetter: (params) => {
      return generateName(
        params.row.User.f,
        params.row.User.i,
        params.row.User.o
      );
    },
    width: 200,
  },
  {
    field: "depart",
    headerName: "Подразделение",
    valueGetter: (params) => {
      return params.row.Depart.title;
    },
    width: 200,
  },

  {
    field: "fio_old",
    headerName: "Предыдущий держатель",
    valueGetter: (params) => {
      return generateName(
        params.row.UserOld?.f,
        params.row.UserOld?.i,
        params.row.UserOld?.o
      );
    },
    width: 200,
  },
  {
    field: "depart_old",
    headerName: "Предыдущее подразделение",
    valueGetter: (params) => {
      return params.row.DepartOld?.title;
    },
    width: 200,
  },
];

export default columns;
