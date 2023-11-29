import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from '@mui/material';
import Title from './CreateForm/Title';
import ContactDocId from './CreateForm/ContactDocId';
import MailId from './CreateForm/MailId';
import LawActId from './CreateForm/LawActId';
import LawExecId from './CreateForm/LawExecId';
import DocType from './CreateForm/DocType';
import { store } from '../../../Reducer';
import createDocument from '../../../api/createDocument';

interface DialogProps {
  open: boolean;
  onClose: VoidFunction;
}
export default function DocumentCreateDialog({ open, onClose }: DialogProps) {
  const data = store.getState().Doc;
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Создание документа</DialogTitle>
      <DialogContent>
        {/**
         * Form
         */}
        <Title />
        <ContactDocId />
        <MailId />
        <LawActId />
        <LawExecId />
        <DocType />
      </DialogContent>
      <DialogActions>
        <Grid item xs sx={{}}>
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              createDocument(data);
            }}
          >
            Создать
          </Button>
        </Grid>
        <Grid item xs sx={{}}>
          <Button variant="contained" color="error" onClick={onClose}>
            Отмена
          </Button>
        </Grid>
      </DialogActions>
    </Dialog>
  );
}
