import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import { ruRU } from '@mui/material/locale';
import { ruRU as ruRUGrid } from '@mui/x-data-grid';

export const theme = createTheme(
  {
    palette: {
      primary: {
        main: '#556cd6',
      },
      secondary: {
        main: '#7c91f2',
      },
      error: {
        main: red.A400,
      },
      background: {
        default: '#fff',
      },
    },
  },
  ruRU,
  ruRUGrid,
);
