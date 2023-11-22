import { Button } from '@mui/material';
import { useAppDispatch } from '../../Reducer';
import getToken from '../../api/getToken';
import { setLoginTrue } from '../../Reducer/State';

export default function Authorization() {
  const dispatch = useAppDispatch();
  return (
    <Button
      variant="outlined"
      color="primary"
      onClick={() => {
        getToken(true).subscribe(() => {
          dispatch(setLoginTrue());
        });
      }}
    >
      Авторизация
    </Button>
  );
}
