import { Button } from '@mui/material';
import { useAppDispatch } from '../../Reducer';
import { relogin } from '../../Reducer/State';
import getToken from '../../api/Login/getToken';

export default function Authorization() {
  const dispatch = useAppDispatch();
  return (
    <Button
      variant="outlined"
      color="primary"
      onClick={() => {
        getToken(true).subscribe(() => {
          dispatch(relogin());
        });
      }}
    >
      Авторизация
    </Button>
  );
}
