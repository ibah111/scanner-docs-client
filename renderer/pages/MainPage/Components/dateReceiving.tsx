import { Typography } from "@mui/material";
import moment from "moment";
import React from "react";
import { useAppSelector } from "../../../Reducer";

interface DateReceiving {
  date_post: string;
}

export default function DateReceiving() {
  const data = useAppSelector((state) => state.Data?.doc.date_post);
  return (
    <React.Fragment>
      <Typography>
        Дата поступления <br /> {moment(data).format("DD.MM.YYYY")}
      </Typography>
    </React.Fragment>
  );
}
