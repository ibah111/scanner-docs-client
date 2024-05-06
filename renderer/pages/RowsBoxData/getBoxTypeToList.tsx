import {
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
  Tooltip,
  Typography,
} from '@mui/material';
import { useAppDispatch } from '../../Reducer';
import { useGridApiContext, useGridSelector } from '@mui/x-data-grid-premium';
import { GridStatePremium } from '@mui/x-data-grid-premium/models/gridStatePremium';
import React from 'react';
import getAllBoxTypes, { BoxType } from '../../api/Box/getAllBoxTypes';
import { enqueueSnackbar } from 'notistack';
import DeleteDocumentsFromBox from '../../api/Box/deleteDocumentsFromBox';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteBoxType from '../../api/Box/deleteBoxType';

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

  const callback = React.useCallback(() => {
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

  React.useEffect(() => {
    callback();
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
                <InputLabel id="box-id">{'Тип'}</InputLabel>
                <Select
                  labelId="box-id"
                  label={'Тип'}
                  value={boxId}
                  onChange={(params) => {
                    console.log('params.target.value', params.target.value);
                    setBoxId(params.target.value as number);
                  }}
                >
                  <MenuItem>
                    <em>Не выбрано</em>
                  </MenuItem>
                  {boxTypes.map((type) => (
                    <MenuItem key={type.id} value={type.title}>
                      <Grid item container>
                        <Grid item xs={11}>
                          <Tooltip
                            title={`Тип: ${type.title}, Кем добавлен: ${type.who_added_type}`}
                          >
                            <Typography>{type.title}</Typography>
                          </Tooltip>
                        </Grid>
                        <Grid xs={1} item alignItems={'flex-end'}>
                          <Tooltip title={'Удалить тип'}>
                            <IconButton
                              size="small"
                              onClick={() =>
                                DeleteBoxType(type.id).subscribe({
                                  next(value) {
                                    console.log(
                                      'DeleteBoxType, next(value) => ',
                                      value,
                                    );
                                    enqueueSnackbar('Тип удален', {
                                      variant: 'warning',
                                    });
                                  },
                                  complete() {
                                    console.log('DeleteBoxType, complete');
                                    enqueueSnackbar(
                                      'Complete, type was deleted',
                                      {
                                        variant: 'success',
                                      },
                                    );
                                  },
                                  error(err) {
                                    console.log(
                                      'DeleteBoxType, error(err) => ',
                                      err,
                                    );
                                    enqueueSnackbar('Произошла ошибка', {
                                      variant: 'error',
                                    });
                                  },
                                })
                              }
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </Grid>
                      </Grid>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </DialogContent>
          <Divider />
          <DialogActions>
            <Grid>
              <Button
                variant="contained"
                onClick={() => {
                  DeleteDocumentsFromBox(rows).subscribe({
                    next: () => {
                      handleClose();
                      enqueueSnackbar('Документы присвоены к коробу', {
                        variant: 'success',
                      });
                    },
                  });
                }}
              >
                Присвоить
              </Button>
            </Grid>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
}
