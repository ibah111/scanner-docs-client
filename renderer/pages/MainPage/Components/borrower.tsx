import { Typography } from "@mui/material";
import React from "react";
import { useAppSelector } from "../../../Reducer";

interface Borrower {
  fio_dol: string;
}

export default function Borrower() {
  const data = useAppSelector((state) => state.Data?.doc.fio_dol);
  return (
    <React.Fragment>
      <Typography>
        ФИО должника <br />
        {data}
      </Typography>
    </React.Fragment>
  );
}
