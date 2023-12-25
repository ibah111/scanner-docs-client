import { Button } from '@mui/material';
import { useAppDispatch } from '../../Reducer';
import { resetData } from '../../Reducer/Data';
import RefreshIcon from '@mui/icons-material/Refresh';
export default function ResetDataButton() {
  const dispatch = useAppDispatch();
  return (
    <Button
      onClick={() => dispatch(resetData())}
      variant="outlined"
      size="small"
      color="error"
      startIcon={<RefreshIcon />}
    >
      Сбросить штрих
    </Button>
  );
}
