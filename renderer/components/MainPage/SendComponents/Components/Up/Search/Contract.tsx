import { Grid, TextField } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../../../../../ReducerSend';
import { setContract } from '../../../../../../ReducerSend/Search';

export default function Contract({ onEnter }: { onEnter: () => void }) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const contract = useAppSelector((state) => state.Search.contract);
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
          label={t('form.search.contract')}
          value={contract}
          onKeyPress={onPress}
          onChange={(event) => dispatch(setContract(event.target.value))}
        />
      </Grid>
    </>
  );
}
