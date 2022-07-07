import { Typography } from "@mui/material";
import React from "react";
import { useAppSelector } from "../../../Reducer";

interface Departamet {
  depart: string;
}

export default function Departament() {
  const data = useAppSelector((state) => state.Data?.depart);
  return (
    <React.Fragment>
      <Typography>
        Департамент <br /> {data}
      </Typography>
      <Typography></Typography>
    </React.Fragment>
  );
}
