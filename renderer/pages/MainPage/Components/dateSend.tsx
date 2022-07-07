import { Typography } from "@mui/material";
import moment from "moment";
import React from "react";
import { useAppSelector } from "../../../Reducer";

interface DateSend {
  date_send: Date;
}

export default function DateSend() {
  const data = useAppSelector((state) => state.Send.DateSend);
  return (
    <React.Fragment>
      <Typography>
        Дата отправки <br />
        {moment(data).format("DD.MM.YYYY")}
      </Typography>
    </React.Fragment>
  );
}
