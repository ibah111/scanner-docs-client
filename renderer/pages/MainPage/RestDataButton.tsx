import { Button } from '@mui/material';
import { useAppDispatch } from '../../Reducer';
import { resetDoc as resetScan } from '../../Reducer/DocArray';
import RefreshIcon from '@mui/icons-material/Refresh';
/**
 * resets the scan
 * @returns void function
 */
export default function ResetDataButton() {
  const dispatch = useAppDispatch();
  return (
    <Button
      onClick={() => dispatch(resetScan())}
      variant="outlined"
      size="small"
      color="error"
      startIcon={<RefreshIcon />}
    >
      Сбросить штрих
    </Button>
  );
}
