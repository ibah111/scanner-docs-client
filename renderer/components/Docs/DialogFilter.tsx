import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import React from "react";
import getDocs from "../../api/getDocs";
import { useAppDispatch } from "../../Reducer";
import { setDocs } from "../../Reducer/Docs";
import SearchIcon from "@mui/icons-material/Search";

export default function DialogFilter() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [filter, setFilter] = React.useState(false);
  const [title, setTitle] = React.useState<null | string>(null);
  const [contactId, setContactId] = React.useState<null | number>(null);
  const [lawAct, setLawAct] = React.useState<null | number>(null);
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    if (filter) {
      getDocs(title, contactId, lawAct).then((res) => {
        dispatch(setDocs(res));
        setFilter(false);
        console.log(res);
      });
    }
  }, [filter]);
  return (
    <>
      <IconButton
        sx={{ fontSize: 16, fontStyle: "italic", pl: 0 }}
        onClick={handleClickOpen}
      >
        <SearchIcon /> Поиск
      </IconButton>
      <Dialog open={open}>
        <DialogTitle>Поиск</DialogTitle>
        <DialogContent sx={{ pb: 0 }}>
          <TextField
            id="title"
            label="Название документа"
            onChange={(e) => setTitle(e.target.value)}
            sx={{ width: 400 }}
          />
        </DialogContent>
        <DialogContent sx={{ pb: 0 }}>
          <TextField
            id="contact_doc_id"
            label="Номер документа в контакте"
            onChange={(e) => setContactId(parseInt(e.target.value))}
            sx={{ width: 400 }}
          />
        </DialogContent>
        <DialogContent>
          <TextField
            id="law_act_id"
            label="law_act_id"
            onChange={(e) => setLawAct(parseInt(e.target.value))}
            sx={{ width: 400 }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setFilter(true);
              handleClose();
            }}
            color="primary"
            variant="contained"
            sx={{ float: "right", mr: "13px" }}
          >
            Найти
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
