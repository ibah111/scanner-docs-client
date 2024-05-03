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

export default function RCourtId() {
  const { t } = useTranslation();
  const [types, setTypes] = React.useState<('' | LawCourt)[]>(['']);
  const [type, setType] = React.useState<'' | LawCourt>('');
  const [name, setName] = React.useState('');
  const data = getData('r_court_id', 'null');
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
  }, [name]);
  React.useEffect(() => {
    if (data.value !== '') {
      const sub = getCourt({ id: data.value as number }).subscribe((court) => {
        setTypes(['', ...court]);
        setType(court[0]);
        const o = court[0];
        const whereSendString = `(${o.id}), ${o.name}, ${o.address}, ${o.district}`;
        dispatch(setSendDocProperty(['WhereSend', whereSendString]));
      });
      return sub.unsubscribe.bind(sub);
    } else {
      setTypes(['']);
      setType('');
    }
  }, [data.value]);
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
            console.log('Наименование ФССП', value);
            if (value) {
              data.setValue(value.id);
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
