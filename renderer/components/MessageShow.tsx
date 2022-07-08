import { useSnackbar } from "notistack";
import React from "react";
import { useAppSelector } from "../Reducer";

export default function MessageShow() {
  const message = useAppSelector((state) => state.Message);
  const { enqueueSnackbar } = useSnackbar();
  React.useEffect(() => {
    if (message.message) enqueueSnackbar(message.message, message.params);
  }, [message]);
  return <></>;
}
