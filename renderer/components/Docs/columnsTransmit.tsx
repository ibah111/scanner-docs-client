import { GridColumns } from "@mui/x-data-grid-premium";
import moment from "moment";
import { Transmit } from "../../Schemas/Transmit.model";
import { generateName } from "../../utils/generateName";

const columnsTransmit: GridColumns<Transmit> = [
  {
    field: "date_send",
    headerName: "Дата отправки в банк/ОСП",
    valueGetter: (params) => {
      return moment(params.row.date_send).format("LL");
    },
    type: "dateTime",
    width: 200,
  },
  {
    field: "where_send",
    headerName: "Куда отправлено",
    valueGetter: (params) => {
      return params.row.where_send;
    },
    width: 200,
  },
  {
    field: "sender",
    headerName: "Кем отправлено",
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
];

export default columnsTransmit;
