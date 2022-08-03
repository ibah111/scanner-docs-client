import { Box, Button, Grid } from "@mui/material";
import { DataGridPremium, GridCellParams } from "@mui/x-data-grid-premium";
import { lookup } from "mime-types";
import React from "react";
import getDocuments from "../../api/getDocuments";
import { useAppSelector } from "../../Reducer";
import { Doc } from "../../Schemas/Doc.model";
import { changeMime } from "../../utils/fileConvert";
import columns from "./columns";
import OpenDocuments from "./OpenDocuments";

export default function Docs() {
  const data = useAppSelector((state) => state.Docs);
  const rows = data ? data : [];
  const [fileUrl, setUrl] = React.useState("");
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <OpenDocuments
        fileUrl={fileUrl}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      />
      <Box>
        <Grid container direction="column" alignItems="center" height="100%">
          <Grid
            item
            container
            direction="row"
            justifyContent="space-around"
            alignItems="center"
            height="100%"
          >
            (
            <DataGridPremium
              autoHeight
              columns={columns}
              onCellClick={(params: GridCellParams<any, Doc>) => {
                getDocuments(Number(params.row.law_act_id)).then((res) => {
                  const file = changeMime(params.row.title, res);
                  setUrl(URL.createObjectURL(file));
                  setOpen(true);
                });
              }}
              rows={rows}
              hideFooter
            />
            )
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
