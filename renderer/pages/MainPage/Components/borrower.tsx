import {  Typography } from "@mui/material";
import React from "react";

interface Borrower{
    fio_dol: string
}

export default function Borrower(){
    return(
        <React.Fragment>
      <Typography
      >
        ФИО должника
      </Typography>
    </React.Fragment>
    )
}