import { Grid, TextField } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../../../../../ReducerSend';
import { setName } from '../../../../../../ReducerSend/Search';

export default function Name({ onEnter }: { onEnter: () => void }) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const name = useAppSelector((state) => state.Search.name);
  const onPress = React.useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter') {
        onEnter();
      }
    },
    [onEnter],
  );
  return (
    <>
      <Grid item>
        <TextField
          label={t('form.search.name')}
          value={name}
          onKeyPress={onPress}
          onChange={(event) => dispatch(setName(event.target.value))}
        />
      </Grid>
    </>
  );
}
