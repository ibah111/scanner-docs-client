import { Typography } from "@mui/material";
import React from "react";

interface CurrentHolder{
    current_holder: string
}

export default function CurrentHolder(){
    return(
        <React.Fragment>
      <Typography
      >
        Текущий держатель
      </Typography>
    </React.Fragment>
    )
}