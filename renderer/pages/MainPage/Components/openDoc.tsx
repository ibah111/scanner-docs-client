import { Button, Dialog, Link } from "@mui/material";
import React from "react";
import { useAppSelector } from "../../../Reducer";
import fileConvert from "../../../utils/fileConvert";
export default function OpenDoc() {
  const data = useAppSelector((state) => state.Data?.file);
  const [open, setOpen] = React.useState(false);
  const [fileUrl, setUrl] = React.useState("");
  const Click = () => {
    const file = fileConvert(data);
    console.log(file);
    setUrl(URL.createObjectURL(file));
    setOpen(true);
  };
  return (
    <>
      <Button onClick={Click}>Открыть документ</Button>
      <Dialog open={open} fullScreen onClose={() => setOpen(false)}>
        <iframe src={fileUrl} height="100%" width="100%"></iframe>
        <Button onClick={() => setOpen(false)}>Вернуться назад</Button>
      </Dialog>
    </>
  );
}
