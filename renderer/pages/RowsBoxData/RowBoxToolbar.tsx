import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
} from '@mui/x-data-grid-premium';
import GetBoxTypeToList from './getBoxTypeToList';
import { Can } from '../../casl/casl.factory';
import { Action, Subject } from '../../casl/casl';
interface RowBoxToolbarProps {
  refresh: VoidFunction;
}
export default function RowBoxToolbar({ refresh }: RowBoxToolbarProps) {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <Can I={Action.Manage} a={Subject.Barcode}>
        <GetBoxTypeToList refresh={refresh} />
      </Can>
    </GridToolbarContainer>
  );
}
