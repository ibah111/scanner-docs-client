import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
} from '@mui/x-data-grid-premium';
import AddDocumentButton from './AddDocumentButton';
import { Can } from '../../../casl/casl.factory';
import { Action, Subject } from '../../../casl/casl';

interface DocToolbarProps {
  handleOpenDocumentCreate: VoidFunction;
}
export function DocumentToolbar({ handleOpenDocumentCreate }: DocToolbarProps) {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      {/**
       * @TODO добавить can
       */}
      <Can I={Action.Manage} a={Subject.Document}>
        <AddDocumentButton
          handleOpenDocumentCreate={handleOpenDocumentCreate}
        />
      </Can>
    </GridToolbarContainer>
  );
}
