import { GridColumns } from "@mui/x-data-grid-premium";
import moment from "moment";
import { Log } from "../../Schemas/Log.model";
import { generateName } from "../../utils/generateName";

const columnsTransmit: GridColumns<Log> = [
  {
    field: "date_send",
    headerName: "Дата отправки в банк/ОСП",
    valueGetter: (params) => {
      return moment(params.row.Transmits?.date_send).toDate();
    },
    type: "date",
    width: 200,
  },
  {
    field: "where_send",
    headerName: "Куда отправлено",
    valueGetter: (params) => {
      return params.row.Transmits?.where_send;
    },
    width: 200,
  },
  {
    field: "sender",
    headerName: "Пользователь",
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
    field: "status",
    headerName: "Статус",
    valueGetter: (params) => {
      return params.row.Status.title;
    },
    width: 200,
  },
  {
    field: "date_return",
    headerName: "Дата возврата",

    valueGetter: (params) => {
      return moment(params.row.Transmits?.date_send).toDate();
    },
    type: "date",
    width: 200,
  },
];

export default columnsTransmit;
