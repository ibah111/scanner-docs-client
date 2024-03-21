import { Grid, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import getData from '../../../../../../../utils/getData';
export default function CourtDocNum() {
  const { t } = useTranslation();
  const data = getData('court_doc_num', 'string');
  return (
    <>
      <Grid sx={{ width: 220 }} item>
        <TextField
          error={data.isInvalid}
          fullWidth
          value={data.value}
          onChange={(event) => data.setValue(event.target.value)}
          label={t('form.send.court_doc_num')}
        />
      </Grid>
    </>
  );
}
