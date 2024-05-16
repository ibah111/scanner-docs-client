import { Button, Grid, TextField, Typography } from '@mui/material';
import { DataGridPremium } from '@mui/x-data-grid-premium';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../Reducer';
import SendingForm from '../../components/MainPage/sendingForm';
import MainPageColumns from '../../components/MainPage/MainPageColumns';
import CustomPagination from '../../components/Pagination/CustomPagination';
import { Can } from '../../casl/casl.factory';
import { Action, Subject } from '../../casl/casl';
import MainPageToolbar from './MainPageToolbar';
import { CodeFormatCustom } from '../../utils/NumberFormatMask';
import { resetDoc, setDoc } from '../../Reducer/DocArray';
import { resetSend } from '../../Reducer/SendDoc';
import getData from '../../api/getData';
import { reset } from '../../Reducer/Send';
import { setContract, setName } from '../../Reducer/Search';

export default function Main() {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.DocArray);
  const boxId = data[0]?.Box?.id;
  const boxUserName =
    data[0]?.Box?.User.f +
    ' ' +
    data[0]?.Box?.User.i +
    ' ' +
    data[0]?.Box?.User.o;
  const boxDepartName = data[0]?.Box?.Depart.title;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    dispatch(reset());
  };

  const [code, setCode] = React.useState<string>('');
  const handleScan = () => {
    dispatch(reset());
    dispatch(resetDoc());
    dispatch(resetSend());
    getData(code).subscribe((res) => {
      dispatch(setDoc(res));
      const resObj = res[0].DocData.Result;
      dispatch(setName(resObj.fio_dol));
      dispatch(setContract(resObj.kd));
    });
  };
  const buttonCondition = (value: string): boolean => {
    if (value.length === 12) return false;
    return true;
  };
  return (
    <>
      <Grid
        item
        xs
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        sx={{ minHeight: 0, minWidth: 0 }}
      >
        <Grid item sx={{ minHeight: 0, minWidth: 0 }}>
          {data.length > 1 && (
            <Typography sx={{ mt: 2, ml: 2, mb: 2 }}>
              <b>ID короба:</b> {boxId} <b>Предыдущий держатель:</b>{' '}
              {boxUserName} <b>Департамент:</b> {boxDepartName}
            </Typography>
          )}
        </Grid>
        <Grid
          item
          xs={data.length > 1 ? true : false}
          sx={{ minHeight: 0, minWidth: 0, height: '100%', width: '100%' }}
        >
          {data.length > 0 ? (
            <DataGridPremium
              pinnedColumns={{
                left: ['id'],
                right: ['actions'],
              }}
              sx={{
                width: '100%',
              }}
              autoHeight={data.length === 1}
              rows={data}
              columns={MainPageColumns}
              slots={{
                toolbar: MainPageToolbar,
                pagination: CustomPagination,
              }}
              slotProps={{
                toolbar: { handleOpen },
              }}
              pagination
            />
          ) : (
            <>
              <Typography align={'center'} variant={'h4'} sx={{ pt: 5 }}>
                Подключите сканер штрих-кода и начните работу
              </Typography>
              <Grid
                container
                sx={{
                  alignContent: 'center',
                }}
              >
                <Grid
                  item
                  xs
                  sx={{
                    margin: '5px',
                  }}
                >
                  <Typography align={'center'} variant={'h4'}>
                    Или введите код вручную:
                  </Typography>
                </Grid>
              </Grid>
              <Grid item container rowSpacing={1}>
                <Grid item container rowSpacing={1}>
                  <Grid
                    item
                    xs={12}
                    border={'center'}
                    justifyContent={'center'}
                    display={'flex'}
                    sx={{
                      margin: '2px',
                    }}
                  >
                    <Grid item>
                      <TextField
                        onKeyDown={(event) => {
                          if (event.key === 'Enter') handleScan();
                        }}
                        label="Номер штриха"
                        value={code}
                        onChange={(event) => setCode(event.target.value)}
                        InputProps={{
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          inputComponent: CodeFormatCustom as any,
                        }}
                      >
                        Штрихкод
                      </TextField>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    border={'center'}
                    justifyContent={'center'}
                    display={'flex'}
                  >
                    <Button
                      disabled={buttonCondition(code)}
                      size="medium"
                      variant="contained"
                      onClick={() => handleScan()}
                    >
                      Поиск
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </>
          )}
        </Grid>
        {data.length > 0 && (
          <Can I={Action.Manage} a={Subject.Barcode}>
            <SendingForm open={open} onClose={handleClose} />
          </Can>
        )}
      </Grid>
    </>
  );
}
