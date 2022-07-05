import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import React from "react";

interface SendingForm {
  date_send: Date;
  where_send: string;
}

export default function SendingForm() {
  const [date_send, setDateSend] = React.useState<Date | null>(null);
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
            value={date_send}
            onChange={(newValue) => {
              setDateSend(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
          <Typography>
            <TextField id="where_send" label="отправлено" variant="outlined" />
          </Typography>
        </Box>
      </Paper>
    </React.Fragment>
  );
}
