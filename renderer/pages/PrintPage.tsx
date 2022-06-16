import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Typography,
  } from "@mui/material";
  import { ipcRenderer } from "electron";
  import React from "react";
  import { PortInfo } from "@serialport/bindings-cpp";
  import Link from "../components/Link";
  
export default function PrintPage() {
    return (<>
        <Button component={Link} href="/home"> Вернуться</Button>
        <Button component ={Link} href="/MainPage">Введите идентификационные данные</Button>
    </>
    )
};
  
  