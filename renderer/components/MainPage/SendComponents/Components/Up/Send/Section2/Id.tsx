import { Grid, TextField } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../../../../../../ReducerSend';

export default function Id() {
  const { t } = useTranslation();
  const id = useAppSelector((state) => state.Send.id);
  return (
    <>
      <Grid item>
        <TextField label={t('form.send.id')} value={id || ''} disabled />
      </Grid>
    </>
  );
}
