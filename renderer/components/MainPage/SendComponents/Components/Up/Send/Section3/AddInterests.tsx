import { Checkbox, FormControlLabel, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import getData from '../../../../../../../utils/getData';

export default function AddInterests() {
  const { t } = useTranslation();
  const data = getData('add_interests', 'boolean');
  return (
    <Grid item>
      <FormControlLabel
        control={
          <Checkbox
            checked={data.value}
            onChange={(event) => data.setValue(event.target.checked)}
          />
        }
        label={t('form.send.add_interests')}
      />
    </Grid>
  );
}
