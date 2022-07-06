import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { Moment } from "moment";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../Reducer";
import { setData } from "../../../Reducer/Send";

interface SendingForm {
  date_send: Date;
  where_send: string;
}

export default function SendingForm() {
  const data = useAppSelector((state) => state.Send);
  const dispatch = useAppDispatch();
  React.useEffect(() => {
  }, [data.WhereSend, data.DateSend]);
  return (
    <React.Fragment>
      <Paper>
        <Box
          sx={{
            bgcolor: "#cfe8fc",
            height: "300px",
            width: "500px",
            "& .MuiTextField-root": { m: 1, width: "50ch" },
          }}
        >
          <Typography variant="h4" textAlign={"center"}>
            Отправляем в банк/ОСП
          </Typography>
          <DatePicker
            label="Выберите дату"
            value={data.DateSend}
            onChange={(newValue: Moment) => {
              dispatch(setData(["DateSend", newValue.toISOString()]));
            }}
            renderInput={(params) => <TextField {...params} />}
          />
          <TextField
            id="where_send"
            label="отправлено"
            variant="outlined"
            value={data.WhereSend}
            onChange={(event) => {
              dispatch(setData(["WhereSend", event.target.value]));
            }}
          />
        </Box>
      </Paper>
    </React.Fragment>
  );
}
