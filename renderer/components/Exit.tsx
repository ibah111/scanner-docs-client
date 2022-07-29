import { Button } from "@mui/material";
import store from "../lib/store";
import { useAppDispatch } from "../Reducer";
import { resetLogin } from "../Reducer/State";
export default function Exit() {
  const dispatch = useAppDispatch();
  return (
    <Button
      sx={{ position: "absolute", bottom: "15px", left: "85%" }}
      variant="outlined"
      color="secondary"
      onClick={() => {
        store.set("token", "");
        dispatch(resetLogin());
      }}
    >
      Выход
    </Button>
  );
}
