import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { createTheme as createThemeOrigin, PaletteMode } from '@mui/material';
import '@mui/x-data-grid-pro/themeAugmentation';
import { ruRU } from '@mui/x-data-grid-premium';
import { ruRU as ruRUgrid } from '@mui/x-data-grid-premium';
import { red } from '@mui/material/colors';
export function createTheme(mode?: PaletteMode) {
  return createThemeOrigin(
    {
      palette: {
        mode,
      },
      typography: {
        fontFamily: 'roboto',
        fontSize: 13,
      },
      components: {
        // Name of the component
        MuiTextField: {
          defaultProps: { size: 'small' },
        },
        MuiAutocomplete: {
          defaultProps: { size: 'small' },
        },
        MuiFormControl: {
          defaultProps: { size: 'small' },
        },
        MuiDataGrid: {
          defaultProps: { density: 'compact' },
        },
      },
    },
    ruRU,
    ruRUgrid,
  );
}
export const theme = createThemeOrigin(
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
  ruRUgrid,
);
