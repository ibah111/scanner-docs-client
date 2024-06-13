import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
} from '@mui/x-data-grid-premium';
import SendForm from './SendToolbarButton';
interface MainPageToolbarInterface {
  handleOpen: VoidFunction;
}
export default function MainPageToolbar({
  handleOpen,
}: MainPageToolbarInterface) {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <SendForm handleOpen={handleOpen} />
    </GridToolbarContainer>
  );
}
