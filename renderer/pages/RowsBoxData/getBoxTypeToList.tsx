import {
  Autocomplete,
  AutocompleteRenderInputParams,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import { useAppDispatch } from '../../Reducer';
import { setBox } from '../../Reducer/Box';
import createCode from '../../api/createCode';
import { useGridApiContext, useGridSelector } from '@mui/x-data-grid-premium';
import { GridStatePremium } from '@mui/x-data-grid-premium/models/gridStatePremium';
import React from 'react';
import InfoAdornment from './addons/InfoAdornment';
import getAllBoxTypes, { BoxType } from '../../api/Box/getAllBoxTypes';
import { enqueueSnackbar } from 'notistack';
import Typ from '../../components/MainPage/SendComponents/Components/DebtGuarantor/Address/Form/Typ';
import DeleteIcon from '@mui/icons-material/Delete';

const falseHelper = `Наименование должно превышать длину в 10 символов`;
interface PrintCodesButtonProps {
  refresh: VoidFunction;
}

export default function GetBoxTypeToList({ refresh }: PrintCodesButtonProps) {
  const dispatch = useAppDispatch();
  const gridApi = useGridApiContext();
  const rows = useGridSelector(
    gridApi,
    (state: GridStatePremium) => state.rowSelection,
  ) as number[];
  const [open, setOpen] = React.useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const disabledCondition = (): boolean => {
    if (rows.length > 0) return false;
    return true;
  };
  const [boxId, setBoxId] = React.useState<number>();

  const [boxTypes, setBoxTypes] = React.useState<BoxType[]>([]);

  React.useEffect(() => {
    getAllBoxTypes().subscribe({
      next(value) {
        setBoxTypes(value);
      },
      error(error) {
        console.log(error);
        enqueueSnackbar('Error happened', {
          variant: 'error',
        });
      },
    });
  }, []);
  return (
    <>
      <Button
        onClick={() => handleOpen()}
        color="primary"
        variant="contained"
        size="small"
        disabled={disabledCondition()}
      >
        {`Присвоить документы в короб`}
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth={'md'} fullWidth>
        <DialogContent>
          <DialogTitle>
            <Grid alignItems={'center'}>
              <Typography align="center">{`Присвойте документы в короб: ${rows}?`}</Typography>
            </Grid>
          </DialogTitle>
          <Divider />
          <DialogContent>
            <Grid>
              <FormControl fullWidth>
                <Select
                  value={boxId}
                  onChange={(params) => {
                    console.log('params.target.value', params.target.value);
                  }}
                >
                  <MenuItem>
                    <em>Не выбрано</em>
                  </MenuItem>
                  {boxTypes.map((item) => (
                    <>
                      <MenuItem key={item.id} value={item.title}>
                        {item.title}
                        <IconButton size="small">
                          <DeleteIcon />
                        </IconButton>
                      </MenuItem>
                    </>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </DialogContent>
          <Divider />
          <DialogActions>
            <Grid>
              <Button>Присвоить</Button>
            </Grid>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
}
