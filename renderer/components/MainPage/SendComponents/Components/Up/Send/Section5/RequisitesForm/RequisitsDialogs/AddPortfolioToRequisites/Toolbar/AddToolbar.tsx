import { Button } from '@mui/material';
import { GridToolbarContainer } from '@mui/x-data-grid-premium';

interface AddToolbarProps {
  handleOpenFunction: VoidFunction;
}

export default function AddToolbar({ handleOpenFunction }: AddToolbarProps) {
  return (
    <>
      <GridToolbarContainer>
        <Button
          onClick={() => handleOpenFunction()}
          size="small"
          variant="contained"
        >
          {'Выбрать портфели для привязки'}
        </Button>
      </GridToolbarContainer>
    </>
  );
}
