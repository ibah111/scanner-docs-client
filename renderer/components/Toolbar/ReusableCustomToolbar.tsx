import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid-premium';

interface Parameters {
  components: JSX.Element[];
}

export default function ReusableCustomToolbar(params: Parameters) {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      {params.components.map((components) => ({
        ...components,
      }))}
    </GridToolbarContainer>
  );
}
