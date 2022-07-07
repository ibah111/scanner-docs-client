import { Typography } from "@mui/material";
import React from "react";
import { useAppSelector } from "../../../Reducer";

interface KD {
  kd: string;
}

export default function KD() {
  const data = useAppSelector((state) => state.Data?.doc.kd);
  return (
    <React.Fragment>
      <Typography>
        КД <br /> {data}
      </Typography>
    </React.Fragment>
  );
}
