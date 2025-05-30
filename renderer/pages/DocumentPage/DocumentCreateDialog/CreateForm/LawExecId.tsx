import {
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
} from '@mui/material';
import { useAppDispatch } from '../../../../Reducer';
import { setPropertyValue } from '../../../../Reducer/Doc';
import { NumericFormatCustom } from '../../../../utils/NumberFormatMask';
import useDocData from '../../../../hooks/useDocData';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
export default function LawExecId() {
  const dispatch = useAppDispatch();
  const data = useDocData('law_exec_id');
  return (
    <Grid item xs={4}>
      <TextField
        label="ID ИД"
        onChange={(event) =>
          dispatch(
            setPropertyValue(['law_exec_id', Number(event.target.value)]),
          )
        }
        InputProps={{
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          inputComponent: NumericFormatCustom as any,
          endAdornment: (
            <Tooltip title={'Посмотреть ИД'}>
              <InputAdornment position="end">
                <IconButton onClick={() => {}}>
                  <ReceiptLongIcon />
                </IconButton>
              </InputAdornment>
            </Tooltip>
          ),
        }}
        value={data.value}
        required={data.required}
        error={data.error}
        helperText={data.helperText}
      />
    </Grid>
  );
}
