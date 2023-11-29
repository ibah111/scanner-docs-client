import { Add } from '@mui/icons-material';
import { Button } from '@mui/material';
interface AddDocProps {
  handleOpenDocumentCreate: VoidFunction;
}
export default function AddDocumentButton(props: AddDocProps) {
  return (
    <Button
      startIcon={<Add />}
      size="small"
      variant="contained"
      onClick={props.handleOpenDocumentCreate}
      color="primary"
    >
      Создать документ
    </Button>
  );
}
