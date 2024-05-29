import {
  Grid,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../../Reducer';
import SendIcon from '@mui/icons-material/Send';
import ViewListIcon from '@mui/icons-material/ViewList';
import CloseIcon from '@mui/icons-material/Close';
import { reset } from '../../../../../../Reducer/Send';
import { resetDoc, setDoc } from '../../../../../../Reducer/DocArray';
import { resetSend } from '../../../../../../Reducer/SendDoc';
import getData from '../../../../../../api/getData';
import { setContract, setName } from '../../../../../../Reducer/Search';
import { CodeFormatCustom } from '../../../../../../utils/NumberFormatMask';
import search from '../../../../../../apiSend/Search/search';
import {
  setLoadingResults,
  setResults,
} from '../../../../../../Reducer/Results';
import BarcodeDialog from './Barcode/BarcodeDialog';

export default function Barcode() {
  const dispatch = useAppDispatch();
  const code_results = useAppSelector((state) => state.DocArray);
  const [code, setCode] = React.useState<string>('');
  const handleScan = () => {
    enqueueSnackbar('Searching with barcode', {
      variant: 'info',
    });
    //chain of functions
    dispatch(reset());
    dispatch(resetDoc());
    dispatch(resetSend());
    getData(code).subscribe({
      next: (res) => {
        dispatch(setDoc(res));
        const resObj = res[0].DocData.Result;
        dispatch(setName(resObj.fio_dol));
        dispatch(setContract(resObj.kd));
        search().subscribe({
          next: (res) => {
            dispatch(setResults(res));
            dispatch(setLoadingResults(false));
          },
          error: () => {
            setLoadingResults(false);
          },
        });
      },
    });
  };
  const buttonCondition = (value: string): boolean => {
    if (value.length === 12) return false;
    return true;
  };

  const [open, setOpen] = React.useState(false);
  const handleClose = React.useCallback(() => {
    setOpen(false);
  }, []);
  return (
    <>
      <Grid item>
        <Tooltip
          title={
            code_results.length > 0 ? (
              <Typography>{'Поиск проведён. Результаты ниже'}</Typography>
            ) : (
              <Typography variant="h6">
                {'Отсканируйте штрихкод или введите его вручную'}
              </Typography>
            )
          }
        >
          <TextField
            label={'Штрихкод'}
            onKeyDown={(event) => {
              if (event.key === 'Enter') handleScan();
            }}
            value={code}
            onChange={(event) => {
              setCode(event.target.value);
            }}
            InputProps={{
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              inputComponent: CodeFormatCustom as any,
              endAdornment: (
                <>
                  <IconButton
                    disabled={buttonCondition(code)}
                    onClick={() => {
                      handleScan();
                    }}
                  >
                    <SendIcon
                      color={
                        buttonCondition(code) === false ? 'success' : 'action'
                      }
                    />
                  </IconButton>
                  {code_results.length > 0 ? (
                    <>
                      <IconButton
                        onClick={() => {
                          setOpen(true);
                        }}
                      >
                        <ViewListIcon color="success" />
                      </IconButton>
                    </>
                  ) : (
                    <>
                      <Tooltip title="Данных пусты">
                        <CloseIcon color="error" />
                      </Tooltip>
                    </>
                  )}
                </>
              ),
            }}
          />
        </Tooltip>
        {open && <BarcodeDialog open={open} closeFunction={handleClose} />}
      </Grid>
    </>
  );
}
