import { Dialog } from "@mui/material";
import React from "react";
import MenuBar from "../menuBar";

interface DialogFileProps {
  open: boolean;
  fileUrl: string;
  onClose: () => void;
}

export default function OpenDocuments({
  open,
  onClose,
  fileUrl,
}: DialogFileProps) {
  return (
    <>
      <Dialog open={open} fullScreen onClose={onClose}>
        <MenuBar back={() => onClose()} />
        <iframe src={fileUrl} height="100%" width="100%"></iframe>
      </Dialog>
    </>
  );
}
