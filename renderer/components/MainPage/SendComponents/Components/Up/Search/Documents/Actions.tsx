import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import removeDocument from '../../../../../../../apiSend/removeDocument';
interface ActionsProps {
  id: number;
  refresh: () => void;
}
export default function Actions({ id, refresh }: ActionsProps) {
  return (
    <IconButton onClick={() => removeDocument(id).subscribe(refresh)}>
      <DeleteIcon />
    </IconButton>
  );
}
