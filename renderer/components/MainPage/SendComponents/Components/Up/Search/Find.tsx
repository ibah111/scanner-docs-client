import { LoadingButton } from '@mui/lab';
import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import React from 'react';
//Поиск
export default function Find({
  onClick,
  loading,
}: {
  onClick: () => void;
  loading: boolean;
}) {
  const { t } = useTranslation();
  return (
    <>
      <Grid item>
        <LoadingButton loading={loading} onClick={onClick}>
          {t('form.search.find')}
        </LoadingButton>
      </Grid>
    </>
  );
}
