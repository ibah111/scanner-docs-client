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
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { useGridApiContext, useGridSelector } from '@mui/x-data-grid-premium';
import { GridStatePremium } from '@mui/x-data-grid-premium/models/gridStatePremium';
import React from 'react';
import getAllBoxTypes, { BoxType } from '../../api/Box/getAllBoxTypes';
import { enqueueSnackbar } from 'notistack';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteBoxType from '../../api/Box/deleteBoxType';
import { Div } from '../../utils/Div';
import { Can } from '../../casl/casl.factory';
import { Action, Subject } from '../../casl/casl';
import AddDocumentToBox from '../../api/Box/addDocumentToBox';
import AddBoxType from '../../api/Box/addBoxType';
import { LoadingButton } from '@mui/lab';

interface PrintCodesButtonProps {
  refresh: VoidFunction;
}

export default function GetBoxTypeToList({ refresh }: PrintCodesButtonProps) {
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
  /**
   *
   */
  const [buttonLoading, setButtonLoading] = React.useState<boolean>(false);
  const [boxName, setBoxName] = React.useState<string>();
  //
  const GetTypes = React.useCallback(() => {
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
    GetTypes();
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
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel
                    id="box-id"
                    sx={{
                      alignContent: 'center',
                      alignSelf: 'center',
                    }}
                  >
                    {'Тип'}
                  </InputLabel>
                  <Select
                    sx={{
                      height: '55.75px',
                    }}
                    labelId="box-id"
                    label={'Тип'}
                    value={boxId}
                    onChange={(params) => {
                      setBoxId(params.target.value as number);
                    }}
                  >
                    <MenuItem key={0} value={0}>
                      <em>Не выбрано</em>
                    </MenuItem>
                    {boxTypes.map((type) => (
                      <MenuItem key={type.id} value={type.id}>
                        <Grid item container>
                          <Grid item xs={11} alignContent={'center'}>
                            <Tooltip
                              title={`Тип: ${type.title}, Кем добавлен: ${type.who_added_type}`}
                            >
                              <Div>{type.title}</Div>
                            </Tooltip>
                          </Grid>
                          <Grid xs={1} item alignItems={'flex-end'}>
                            <Can I={Action.Manage} a={Subject.Box}>
                              <Tooltip title={'Удалить тип'}>
                                <IconButton
                                  size="small"
                                  onClick={() =>
                                    DeleteBoxType({
                                      id: type.id,
                                    }).subscribe({
                                      next(value) {
                                        console.log(
                                          'DeleteBoxType, next(value) => ',
                                          value,
                                        );
                                        enqueueSnackbar('Тип удален', {
                                          variant: 'warning',
                                        });
                                        GetTypes();
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
                            </Can>
                          </Grid>
                        </Grid>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item container xs={6} spacing={1}>
                <Grid item xs={7}>
                  <TextField
                    size="medium"
                    id="box-name-basic"
                    label="Введите название короба"
                    fullWidth
                    variant="outlined"
                    value={boxName}
                    onChange={(event) =>
                      setBoxName(event.target.value as string)
                    }
                  />
                </Grid>
                <Grid item>
                  <LoadingButton
                    size={'small'}
                    loading={buttonLoading}
                    variant="contained"
                    onClick={() => {
                      enqueueSnackbar(`${boxName}`, { variant: 'info' });
                      setButtonLoading(true);
                      AddBoxType({
                        title: boxName,
                      }).subscribe({
                        next(value) {
                          console.log(value);
                          GetTypes();
                          setBoxName('');
                          setButtonLoading(false);
                        },
                        error: (err) => console.log(err),
                      });
                    }}
                  >
                    Добавить тип
                  </LoadingButton>
                </Grid>
              </Grid>
            </Grid>
          </DialogContent>
          <Divider />
          <DialogActions>
            <Grid>
              <Button
                variant="contained"
                onClick={() => {
                  AddDocumentToBox({
                    list: rows,
                    box_type_id: boxId,
                  }).subscribe({
                    next: () => {
                      handleClose();
                      enqueueSnackbar('Документы присвоены к коробу', {
                        variant: 'success',
                      });
                      refresh();
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
