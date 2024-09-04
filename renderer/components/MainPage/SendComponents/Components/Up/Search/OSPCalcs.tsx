import { Button, Grid } from '@mui/material';

export default function OSPCalcs() {
  const link_url = 'https://chat.nbkfinance.ru/apps/forming/osp';
  return (
    <>
      <Grid item>
        <Button
          variant="text"
          onClick={() => {
            window.ipc.send('OpenInBrowser', link_url);
          }}
        >
          Расчёт %
        </Button>
      </Grid>
    </>
  );
}
