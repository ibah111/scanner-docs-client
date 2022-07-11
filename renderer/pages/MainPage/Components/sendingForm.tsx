import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { Moment } from "moment";
import React from "react";
import SendData from "../../../api/SendData";
import { useAppDispatch, useAppSelector } from "../../../Reducer";
import { setSend } from "../../../Reducer/Send";

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
              dispatch(
                setSend([
                  "DateSend",
                  newValue
                    ? newValue.isValid()
                      ? newValue.toISOString()
                      : newValue.toString()
                    : "",
                ])
              );
            }}
            renderInput={(params) => <TextField {...params} />}
          />
          <TextField
            id="where_send"
            label="Куда"
            variant="outlined"
            value={data.WhereSend}
            onChange={(event) => {
              dispatch(setSend(["WhereSend", event.target.value]));
            }}
          />
          <Button onClick={SendData}>Отправить</Button>
        </Box>
      </Paper>
    </React.Fragment>
  );
}
