import { Typography } from "@mui/material";
import React from "react";
import { useAppSelector } from "../../../Reducer";

interface Registry {
  reestr: string;
}

export default function Registry() {
  const data = useAppSelector((state) => state.Data?.doc.reestr);
  return (
    <React.Fragment>
      <Typography>
        Реестр <br /> {data}
      </Typography>
      <Typography></Typography>
    </React.Fragment>
  );
}
