import { GridColDef } from '@mui/x-data-grid-premium';

export const disableGridUtils: Partial<GridColDef> = {
  filterable: false,
  sortable: false,
  editable: false,
};
