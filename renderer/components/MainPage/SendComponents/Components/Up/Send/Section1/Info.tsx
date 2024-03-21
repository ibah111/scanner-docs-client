import { Grid, TextField } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../../../../../../Reducer';

export default function Info() {
  const { t } = useTranslation();
  const name = useAppSelector((state) => state.Send.fio);
  const contract = useAppSelector((state) => state.Send.contract);
  const port = useAppSelector((state) => state.Send.port);
  return (
    <>
      <Grid item>
        <TextField label={t('form.search.name')} value={name || ''} disabled />
      </Grid>
      <Grid item>
        <TextField
          label={t('form.search.contract')}
          value={contract || ''}
          disabled
        />
      </Grid>
      <Grid item>
        <TextField label={t('form.search.port')} value={port || ''} disabled />
      </Grid>
    </>
  );
}
