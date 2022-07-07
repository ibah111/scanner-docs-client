import { Typography } from "@mui/material";
import moment from "moment";
import React from "react";
import { useAppSelector } from "../../../Reducer";

export default function WhereSend() {
  const data = useAppSelector((state) => state.Send.WhereSend);
  return (
    <React.Fragment>
      <Typography>
        Куда отправлено <br /> {data}
      </Typography>
    </React.Fragment>
  );
}
