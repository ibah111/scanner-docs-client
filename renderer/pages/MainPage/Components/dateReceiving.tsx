import { Typography } from "@mui/material";
import React from "react";

interface DateReceiving{
    date_post: Date
}

export default function DateReceiving(){
    return(
        <React.Fragment>
      <Typography
      >
        Дата поступления
      </Typography>
    </React.Fragment>
    )
}