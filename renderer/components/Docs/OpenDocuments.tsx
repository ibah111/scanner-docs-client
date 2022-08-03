import { Button, Dialog } from "@mui/material";
import React from "react";
import getDocuments from "../../api/getDocuments";
import { changeMime } from "../../utils/fileConvert";
import MenuBar from "../menuBar";

export default function OpenDocuments() {
  const [open, setOpen] = React.useState(false);
  const [fileUrl, setUrl] = React.useState("");
  const Click = () => {
    getDocuments(5125).then((res) => {
      const file = changeMime("help.pdf", res);
      setUrl(URL.createObjectURL(file));
      setOpen(true);
    });
  };
  return (
    <>
      <Button onClick={Click}>Открыть</Button>
      <Dialog open={open} fullScreen onClose={() => setOpen(false)}>
        <MenuBar back={() => setOpen(false)} />
        <iframe src={fileUrl} height="100%" width="100%"></iframe>
      </Dialog>
    </>
  );
}
