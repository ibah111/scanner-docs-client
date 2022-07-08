import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { Moment } from "moment";
import React from "react";
import SendData from "../../../api/SendData";
import { useAppDispatch, useAppSelector } from "../../../Reducer";
import { setData } from "../../../Reducer/Send";

interface SendingForm {
  date_send: Date;
  where_send: string;
}

export default function SendingForm() {
  const data = useAppSelector((state) => state.Send);
  const dispatch = useAppDispatch();
  return (
    <React.Fragment>
      <Paper>
        <Box
          sx={{
            bgcolor: "#cfe8fc",
            height: "230px",
            width: "470px",
            "& .MuiTextField-root": { m: 1, width: "50ch" },
          }}
        >
          <Typography variant="h4" textAlign={"center"}>
            Отправляем в банк/ОСП
          </Typography>
          <DatePicker
            label="Дата отправки"
            value={data.DateSend}
            onChange={(newValue: Moment) => {
              dispatch(setData(["DateSend", newValue.toISOString()]));
            }}
            renderInput={(params) => <TextField {...params} />}
          />
          <TextField
            id="where_send"
            label="Куда"
            variant="outlined"
            value={data.WhereSend}
            onChange={(event) => {
              dispatch(setData(["WhereSend", event.target.value]));
            }}
          />
          <Button onClick={SendData}>Отправить</Button>
        </Box>
      </Paper>
    </React.Fragment>
  );
}
