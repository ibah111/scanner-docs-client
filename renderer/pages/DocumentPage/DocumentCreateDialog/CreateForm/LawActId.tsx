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
import GavelIcon from '@mui/icons-material/Gavel';
export default function LawActId() {
  const dispatch = useAppDispatch();
  const data = useDocData('law_act_id');
  return (
    <Grid item xs={4}>
      <TextField
        label="ID Иска"
        onChange={(event) =>
          dispatch(setPropertyValue(['law_act_id', Number(event.target.value)]))
        }
        InputProps={{
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          inputComponent: NumericFormatCustom as any,
          endAdornment: (
            <Tooltip title={'Посмотреть иски'}>
              <InputAdornment position="end">
                <IconButton onClick={() => {}}>
                  <GavelIcon />
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
