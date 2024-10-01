import { Grid } from '@mui/material';
import { LinkMenuItem } from './Links';

export default function OSPCalcs() {
  const url = 'https://chat.nbkfinance.ru/apps/forming/osp';
  const menuItemName = 'Расчёт %';
  return (
    <>
      <Grid item>
        <LinkMenuItem menuItemName={menuItemName} url={url} />
      </Grid>
    </>
  );
}
