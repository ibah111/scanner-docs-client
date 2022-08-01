import { Button } from "@mui/material";
import React from "react";
import getDocs from "../../api/getDocs";
import { useAppDispatch } from "../../Reducer";
import { setDocs } from "../../Reducer/Docs";

export default function UpdateDocs() {
  const dispatch = useAppDispatch();
  return (
    <>
      <Button
        onClick={() => {
          getDocs().then((res) => {
            dispatch(setDocs(res));
          });
        }}
      >
        Docs
      </Button>
    </>
  );
}
