import { Grid } from '@mui/material';
import AdditionForm from './AdditionForm';
import SearchForm from './SearchForm';

export default function DocumentAdderForm() {
  return (
    <>
      <Grid
        border={'solid'}
        sx={{
          width: '100%',
          height: '100%',
        }}
        color={'red'}
        item
        container
      >
        <Grid
          item
          container
          xs={6}
          border={'solid'}
          direction={'column'}
          borderColor={'black'}
        >
          <AdditionForm />
        </Grid>
        <Grid
          direction={'column'}
          item
          container
          xs={6}
          border={'solid'}
          borderColor={'black'}
        >
          <SearchForm />
        </Grid>
      </Grid>
    </>
  );
}
