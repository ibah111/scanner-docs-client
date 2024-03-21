import { Button, Grid } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import CreateLawExec from '../../CreateLawExec';

export default function CreateExec() {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Grid item>
        <Button onClick={() => setOpen(true)}>
          {t('form.search.create_exec')}
        </Button>
        {open && (
          <CreateLawExec open={open} handleClose={() => setOpen(false)} />
        )}
      </Grid>
    </>
  );
}
