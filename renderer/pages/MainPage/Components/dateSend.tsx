import { Typography } from "@mui/material";
import React from "react";

interface DateSend{
    date_send: Date
}

export default function DateSend(){
    return(
        <React.Fragment>
      <Typography>
        Дата отправки
      </Typography>
    </React.Fragment>
    )
}