import { Button } from '@mui/material';
interface SendFormInterface {
  handleOpen: VoidFunction;
}
export default function SendForm({ handleOpen }: SendFormInterface) {
  return (
    <Button onClick={handleOpen} variant="outlined" size="small">
      Отправка в суд
    </Button>
  );
}
