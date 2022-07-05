import { Typography } from "@mui/material";
import React from "react";

interface Article {
  st_pnkt: string;
}

export default function Article() {
  return (
    <React.Fragment>
      <Typography>Статья и пункт</Typography>
    </React.Fragment>
  );
}
