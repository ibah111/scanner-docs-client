import { Grid } from '@mui/material';
import DocumentAdderForm from './DocumentAdderForm/DocumentAdderForm';

export default function DocumentAdderPage() {
  return (
    <>
      <Grid
        item
        xs
        container
        direction={'column'}
        justifyContent={'flex-start'}
        alignItems={'center'}
        sx={{ minHeight: 0, minWidth: 0 }}
      >
        <DocumentAdderForm />
      </Grid>
    </>
  );
}
