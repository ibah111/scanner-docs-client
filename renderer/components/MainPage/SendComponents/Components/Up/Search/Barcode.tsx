import {
  Grid,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../../Reducer';
import SendIcon from '@mui/icons-material/Send';
import ViewListIcon from '@mui/icons-material/ViewList';
import CloseIcon from '@mui/icons-material/Close';
import { CodeFormatCustom } from '../../../../../../utils/NumberFormatMask';
import BarcodeDialog from './Barcode/BarcodeDialog';
import { setBarcodeState } from '../../../../../../Reducer/Barcode';
import { setDocArray } from '../../../../../../Reducer/DocArray';
import { reset } from '../../../../../../Reducer/Error';
import {
  setResults,
  setLoadingResults,
} from '../../../../../../Reducer/Results';
import { setName, setContract } from '../../../../../../Reducer/Search';
import { resetSend } from '../../../../../../Reducer/SendDoc';
import getData from '../../../../../../api/getData';
import search from '../../../../../../apiSend/Search/search';

export default function Barcode() {
  const dispatch = useAppDispatch();
  const stateСode = useAppSelector((state) => state.Barcode.code);
  const code_results = useAppSelector((state) => state.DocArray);

  const handleScanBarcode = React.useCallback(() => {
    dispatch(reset());
    dispatch(resetSend());
    getData(stateСode).subscribe({
      next: (res) => {
        dispatch(setDocArray(res));
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
  }, [dispatch, stateСode]);
  const buttonCondition = (value: string): boolean => {
    if (value) {
      if (value.length === 12) return false;
    }
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
            InputLabelProps={{
              shrink: true,
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter') handleScanBarcode();
            }}
            value={stateСode}
            onChange={(event) => {
              const textFieldValue = event.target.value;
              dispatch(
                setBarcodeState({
                  code: textFieldValue,
                }),
              );
            }}
            InputProps={{
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              inputComponent: CodeFormatCustom as any,
              endAdornment: (
                <>
                  <IconButton
                    disabled={buttonCondition(stateСode)}
                    onClick={() => {
                      handleScanBarcode();
                    }}
                  >
                    <SendIcon
                      color={
                        buttonCondition(stateСode) === false
                          ? 'success'
                          : 'action'
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
