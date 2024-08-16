import { LawCourt } from '@contact/models';
import { Autocomplete, Grid, TextField } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import getCourt, {
  getCourtPromise,
} from '../../../../../../../apiSend/Court/getCourt';
import getData from '../../../../../../../utils/getData';
import { useAppDispatch } from '../../../../../../../Reducer';
import { setSendDocProperty } from '../../../../../../../Reducer/SendDoc';
import { DateTime } from 'luxon';
import { setValidController } from '../../../../../../../Reducer/ValidController';
import { setData } from '../../../../../../../Reducer/Send';
/**
 *
 * @returns Наименование ФССП
 */
export default function RCourtId() {
  const { t } = useTranslation();
  const [types, setTypes] = React.useState<('' | LawCourt)[]>(['']);
  const [type, setType] = React.useState<'' | LawCourt>('');
  const [name, setName] = React.useState('');
  const data = getData('r_court_id', 'null');
  const load_dt = getData('load_dt', 'date');
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
    if (data.value !== '') {
      const sub = getCourt({ id: data.value as number }).subscribe((court) => {
        setTypes(['', ...court]);
        setType(court[0]);
        const o = court[0];
        const whereSendString = `(${o.id}), ${o.name}, ${o.address}, ${o.district}`;
        changeWhereSend(whereSendString);
      });
      return sub.unsubscribe.bind(sub);
    } else {
      setTypes(['']);
      setType('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changeWhereSend, data.value, dispatch]);

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
                console.log('сбербанк действие');
                data.setValue(value.id);
                const todayDateTime = DateTime.now();
                load_dt.setValue(todayDateTime);
                dispatch(setData(['fssp_date', null]));
                fssp_date.setValue(null);
                dispatch(
                  setValidController(['fssp_date_required_controller', false]),
                );
              } else {
                data.setValue(value.id);
              }
              const txtValue = `(${value.id}) ${value.name} (${value.district})`;
              changeWhereSend(txtValue);
            } else {
              data.setValue('');
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
              error={data.isInvalid}
              required
              label={t('form.send.r_court_id')}
            />
          )}
        />
      </Grid>
    </>
  );
}
