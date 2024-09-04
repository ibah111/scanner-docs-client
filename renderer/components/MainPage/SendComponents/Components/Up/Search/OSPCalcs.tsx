import { Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

export default function OSPCalcs() {
  const link_url = 'https://chat.nbkfinance.ru/apps/forming/osp';
  return (
    <>
      <Grid item>
        <Button variant="text" component={Link} to={link_url} target="_blank">
          Расчёт %
        </Button>
      </Grid>
    </>
  );
}
