import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
} from '@mui/x-data-grid-premium';
import AddDocumentButton from './AddDocumentButton';

interface DocToolbarProps {
  handleOpenDocumentCreate: VoidFunction;
}
export function DocumentToolbar(props: DocToolbarProps) {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      {/**
       * @TODO добавить can
       */}
      <AddDocumentButton
        handleOpenDocumentCreate={props.handleOpenDocumentCreate}
      />
    </GridToolbarContainer>
  );
}
