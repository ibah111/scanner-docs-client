import { Button } from "@mui/material";
import React from "react";
import { SerialPort } from "serialport";
import Link from "../components/Link";

export default function ScanPage() {
  React.useEffect(() => {
    const func = async () => {
      console.log(await SerialPort.list());
    };
    func();
  }, []);
  return (
    <>
      <Button component={Link} href="/home">
        Вернуться
      </Button>
    </>
  );
}
