import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
} from '@mui/x-data-grid-premium';
import { useAppDispatch } from '../../Reducer';
import { Button } from '@mui/material';
import { setBox } from '../../Reducer/Box';
import createCode from '../../api/createCode';

export function RowBoxToolbar() {
  const dispatch = useAppDispatch();
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <Button
        onClick={() => {
          dispatch(setBox(['create', true]));
          createCode();
        }}
        color="primary"
        variant="contained"
        size="small"
      >
        Создать короб
      </Button>
    </GridToolbarContainer>
  );
}
