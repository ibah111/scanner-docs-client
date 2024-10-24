import { LawCourt } from '@contact/models';
import { Autocomplete, Grid, IconButton, TextField } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import getCourt, {
  getCourtPromise,
} from '../../../../../../../apiSend/Court/getCourt';
import getData from '../../../../../../../utils/getData';
import { useAppDispatch } from '../../../../../../../Reducer';
import { setSendDocProperty } from '../../../../../../../Reducer/SendDoc';
import { DateTime } from 'luxon';
import { setData } from '../../../../../../../Reducer/Send';
import { enqueueSnackbar } from 'notistack';
import CustomIcon from '../../../../../../../resources';
/**
 *
 * @returns Наименование ФССП
 */
export default function RCourtId() {
  const { t } = useTranslation();
  const [types, setTypes] = React.useState<('' | LawCourt)[]>(['']);
  const [type, setType] = React.useState<'' | LawCourt>('');
  const [name, setName] = React.useState('');
  const r_court_id_data = getData('r_court_id', 'null');
  const r_court_name_data = getData('r_court_name', 'string', true);
  const is_sberbank = r_court_name_data.value === 'Сбербанк';
  const fssp_date = getData('fssp_date', 'date', true);
  const dispatch = useAppDispatch();

  const [count, setCount] = React.useState<number>(0);
  React.useEffect(() => {
    setCount(count + 1);
    getCourtPromise({
      name: name === t('system.none') ? '' : name,
    }).then((courts) => {
      setTypes(courts);
    });
    /**
     * В hook зависимостях было [name, t]
     * Правило хуков советую избегать обьектов/функций в зависимостях
     */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);
  const changeWhereSend = React.useCallback(
    (value: string) => {
      dispatch(setSendDocProperty(['WhereSend', value]));
    },
    [dispatch],
  );

  React.useEffect(() => {
    if (r_court_id_data.value !== '') {
      const sub = getCourt({ id: r_court_id_data.value as number }).subscribe(
        (court) => {
          setTypes(['', ...court]);
          setType(court[0]);
          const o = court[0];
          const whereSendString = `(${o.id}), ${o.name}, ${o.address}, ${o.district}`;
          changeWhereSend(whereSendString);
          if (o.name === 'Сбербанк') {
            enqueueSnackbar('Предыдущая отправка была в СБЕР', {
              variant: 'info',
            });
            sberbankAction(o.id);
          }
        },
      );
      return sub.unsubscribe.bind(sub);
    } else {
      setTypes(['']);
      setType('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changeWhereSend, r_court_id_data.value, dispatch]);

  // const entry_force_dt_data = getData('entry_force_dt', 'date');
  // const load_dt = getData('load_dt', 'date');

  //sber

  const todayDateTime = DateTime.now();
  /**
   * "cashed" value
   */
  //@ts-expect-error ///
  const [previousValue, setPreviousValue] = React.useState<LawCourt>({});
  const sberbankAction = React.useCallback(
    (value: number) => {
      if (type !== '') {
        enqueueSnackbar('Пред.значение зарезервировано', {
          variant: 'info',
        });
        setPreviousValue(type);
      }
      enqueueSnackbar('Выбран сбербанк', {
        variant: 'success',
        autoHideDuration: 2500,
      });
      r_court_id_data.setValue(value);
      r_court_name_data.setValue('Сбербанк');
      fssp_date.setValue(null);
      dispatch(setData(['fssp_date', null]));
      // entry_force_dt_data.setValue(todayDateTime);
      // load_dt.setValue(todayDateTime);
    },
    [type, r_court_id_data, r_court_name_data, fssp_date, dispatch],
  );
  const resetSberbankAction = React.useCallback(() => {
    setType(previousValue);
    r_court_id_data.setValue(previousValue.id);
    r_court_name_data.setValue(previousValue.name);
    fssp_date.setValue(todayDateTime);
  }, [
    fssp_date,
    previousValue,
    r_court_id_data,
    r_court_name_data,
    todayDateTime,
  ]);

  const sberClick = React.useCallback(async () => {
    if (r_court_name_data.value !== 'Сбербанк') {
      await getCourtPromise({
        name: 'Сбербанк',
      }).then((result) => {
        const value = result[0];
        if (value.name === 'Сбербанк') {
          sberbankAction(value.id);
          setType(value);
        } else {
          enqueueSnackbar('Произошла ошибка в автокомплите', {
            variant: 'warning',
          });
        }
      });
    } else {
      resetSberbankAction();
    }
  }, [r_court_name_data.value, resetSberbankAction, sberbankAction]);

  return (
    <>
      <Grid sx={{ width: 410 }} item>
        <Autocomplete
          disablePortal
          id="r_court_id"
          options={types}
          value={type}
          getOptionLabel={(option) =>
            option !== ''
              ? `(${option.id}) ${option.name} (${option.district})`
              : t('system.none')
          }
          inputValue={name}
          onChange={(_, value) => {
            if (value) {
              if (value.name === 'Сбербанк') {
                sberbankAction(value.id);
              } else {
                r_court_id_data.setValue(value.id);
                r_court_name_data.setValue(value.name);
              }
              const txtValue = `(${value.id}) ${value.name} (${value.district})`;
              changeWhereSend(txtValue);
            } else {
              r_court_id_data.setValue('');
            }
          }}
          onInputChange={(_, newInputValue) => {
            setName(newInputValue);
          }}
          fullWidth
          renderInput={(params) => (
            <TextField
              {...params}
              inputProps={{
                ...params.inputProps,
                value:
                  params.inputProps.value === t('system.none')
                    ? ''
                    : params.inputProps.value,
              }}
              error={r_court_id_data.isInvalid}
              required
              label={t('form.send.r_court_id')}
            />
          )}
        />
      </Grid>
      <Grid item>
        <IconButton onClick={() => sberClick()}>
          {is_sberbank ? (
            <CustomIcon icon={'SBERBANK_GREEN'} />
          ) : (
            <CustomIcon icon={'SBERBANK_BLACK'} />
          )}
        </IconButton>
      </Grid>
    </>
  );
}
