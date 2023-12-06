import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
} from '@mui/x-data-grid-premium';
import PrintCodesButton from './PrintCodesButton';
import { Can } from '../../casl/casl.factory';
import { Action, Subject } from '../../casl/casl';

export function RowBoxToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <Can I={Action.Manage} a={Subject.Barcode}>
        <PrintCodesButton />
      </Can>
    </GridToolbarContainer>
  );
}
