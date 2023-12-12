import {
  GridPaginationModel,
  GridFilterModel,
  GridSortModel,
} from '@mui/x-data-grid-premium';

export interface paramsDataGridInterface {
  paginationModel: GridPaginationModel;
  filterModel: GridFilterModel;
  sortModel: GridSortModel;
}

export interface Page<T> {
  count: number;
  rows: T[];
}
